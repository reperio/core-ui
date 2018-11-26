import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { State } from '../store/initialState';

import { coreApiService } from "../services/coreApiService";
import { userService } from "../services/userService";
import { change } from "redux-form";

export const authActionTypes = {
    AUTH_SET_TOKEN: "AUTH_SET_TOKEN",
    AUTH_CLEAR_TOKEN: "AUTH_CLEAR_TOKEN",
    AUTH_SEND_VERIFICATION_EMAIL_PENDING: "AUTH_SEND_VERIFICATION_EMAIL_PENDING",
    AUTH_SEND_VERIFICATION_EMAIL_SUCCESS: "AUTH_SEND_VERIFICATION_EMAIL_SUCCESS",
    AUTH_SEND_VERIFICATION_EMAIL_ERROR: "AUTH_SEND_VERIFICATION_EMAIL_ERROR",
    AUTH_SET_USER: "AUTH_SET_USER",
    AUTH_SET_IS_AUTH_INITIALIZED: "AUTH_SET_IS_AUTH_INITIALIZED"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        case 400:
        case 401:
        case 403:
            return "Invalid username or password";
        default:
            return "An error occurred, please contact your system administrator"}
}

export const logout = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_CLEAR_TOKEN,
        payload: null
    });
};

export const initializeAuth = () => async (dispatch: Dispatch<any>, getState: () => State) => {
    await loadAuthSessionUser(null)(dispatch, getState);

    dispatch({
        type: authActionTypes.AUTH_SET_IS_AUTH_INITIALIZED
    });
};

export const setAuthToken = (authToken: string) => async (dispatch: Dispatch<any>, getState: () => State) => {
    const state = getState();
    const oldAuthToken = state.authSession.reperioCoreJWT;
    const oldParsedToken = getParsedToken(oldAuthToken);
    const oldUserId = oldParsedToken != null ? oldParsedToken.currentUserId : null;

    dispatch({
        type: authActionTypes.AUTH_SET_TOKEN,
        payload: {authToken}
    });

    await loadAuthSessionUser(oldUserId)(dispatch, getState);
};

const getParsedToken = (jwt: string) => {
    try {
        const parsedToken = jwt != null ? coreApiService.authService.parseJwt(jwt) : null;
        const validParsedToken = parsedToken != null && Math.round((new Date()).getTime() / 1000) < parsedToken.exp ? parsedToken : null;
        return validParsedToken;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const retrieveUserById = async (userId: string) => {
    if (userId == null) {
        return null;
    }

    try {
        const {data} = (await userService.getUserById(userId));
        return data;
    } catch (e) {
        if (e && e.response && e.response.status === 401) {
            return null;
        }
        throw e;
    }
};

export const loadAuthSessionUser = (oldUserId: string) => async (dispatch: Dispatch<any>, getState: () => State) => {
    const state = getState();
    const authToken = state.authSession.reperioCoreJWT;
    const parsedToken = getParsedToken(authToken);

    const newUserId = parsedToken != null ? parsedToken.currentUserId : null;

    if (newUserId === oldUserId) {
        return;
    }

    // retrieveUserById returns null if newUserId is null or if the response is a 401 (e.g. invalid token)
    const newUser = oldUserId == null || (newUserId !== oldUserId && state.authSession) ? await retrieveUserById(newUserId) : state.authSession.user;

    if (newUser == null) {
        dispatch({
            type: authActionTypes.AUTH_CLEAR_TOKEN
        });
    } else if (newUserId !== oldUserId) {
        dispatch({
            type: authActionTypes.AUTH_SET_USER,
            payload: {user: newUser}
        });
    }
};

export const sendVerificationEmail = (userId: string, email: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_SEND_VERIFICATION_EMAIL_PENDING
    });

    try {
        await coreApiService.authService.sendVerificationEmail(userId, email);

        dispatch({
            type: authActionTypes.AUTH_SEND_VERIFICATION_EMAIL_SUCCESS
        });

    } catch (e) {
        dispatch({
            type: authActionTypes.AUTH_SEND_VERIFICATION_EMAIL_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};