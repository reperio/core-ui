import { User } from '@reperio/core-connector';
import {Dispatch} from "react-redux";
import { State } from '../store/initialState';
import { coreApiService } from "../services/coreApiService";

export const authActionTypes = {
    AUTH_SEND_VERIFICATION_EMAIL_PENDING: "AUTH_SEND_VERIFICATION_EMAIL_PENDING",
    AUTH_SEND_VERIFICATION_EMAIL_SUCCESS: "AUTH_SEND_VERIFICATION_EMAIL_SUCCESS",
    AUTH_SEND_VERIFICATION_EMAIL_ERROR: "AUTH_SEND_VERIFICATION_EMAIL_ERROR",
    AUTH_SET_USER: "AUTH_SET_USER",
    AUTH_SET_IS_AUTH_INITIALIZED: "AUTH_SET_IS_AUTH_INITIALIZED",
    AUTH_SET_REDIRECT_TO_LOGIN: "AUTH_SET_REDIRECT_TO_LOGIN"
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
    await coreApiService.authService.logout();
    dispatch({
        type: authActionTypes.AUTH_SET_REDIRECT_TO_LOGIN
    });
};

export const setLoggedInUser = (user: User, initializeAuth: boolean = false) => async (dispatch: Dispatch<any>, getState: () => State) => {
    if (user != null) {
        dispatch({
            type: authActionTypes.AUTH_SET_USER,
            payload: {user}
        });
        if (initializeAuth) {
            dispatch({
                type: authActionTypes.AUTH_SET_IS_AUTH_INITIALIZED
            });
        }
    } else {
        dispatch({
            type: authActionTypes.AUTH_SET_REDIRECT_TO_LOGIN
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