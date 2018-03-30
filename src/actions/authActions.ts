import {Dispatch} from "react-redux";

import { authService } from "../services/authService";
import { userService } from "../services/userService";

export const authActionTypes = {
    AUTH_LOGIN_PENDING: "AUTH_LOGIN_PENDING",
    AUTH_LOGIN_SUCCESSFUL: "AUTH_LOGIN_SUCCESSFUL",
    AUTH_LOGIN_ERROR: "AUTH_LOGIN_ERROR",
    AUTH_SET_TOKEN: "AUTH_SET_TOKEN",
    AUTH_CLEAR_TOKEN: "AUTH_CLEAR_TOKEN"
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
    window.localStorage.removeItem("authToken");
    dispatch({
        type: authActionTypes.AUTH_CLEAR_TOKEN,
        payload: null
    });
};

export const getAuthToken = () => {
    return window.localStorage.getItem("authToken");
};

export const setAuthToken = (authToken: string, forceActionDispatch = false) => async (dispatch: Dispatch<any>) => {
    const parsedToken = authToken == null ? null : authService.parseJwt(authToken);
    const oldAuthToken = getAuthToken();
    const oldParsedToken = oldAuthToken == null ? null : authService.parseJwt(oldAuthToken);
    if (parsedToken != null && Math.round((new Date()).getTime() / 1000) < parsedToken.exp) {
        window.localStorage.setItem("authToken", authToken);
        if (forceActionDispatch || oldParsedToken == null || oldParsedToken.currentUserId !== parsedToken.currentUserId) {
            const {data: user} = await userService.getUserById(parsedToken.currentUserId);
            dispatch({
                type: authActionTypes.AUTH_SET_TOKEN,
                payload: {authToken, user}
            });
        }
    } else {
        if (forceActionDispatch || oldAuthToken != null) {
            dispatch({
                type: authActionTypes.AUTH_CLEAR_TOKEN,
                payload: null
            });
        }
    }
};

export const setAuth = (user: any) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_LOGIN_SUCCESSFUL,
        payload: {user}
    });
};

export const submitAuth = (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_LOGIN_PENDING,
        payload: {}
    });

    try {
        await authService.login(email, password);
    } catch (e) {
        dispatch({
            type: authActionTypes.AUTH_LOGIN_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};
