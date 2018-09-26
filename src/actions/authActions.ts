import {Dispatch} from "react-redux";
import { history } from '../store/history';

import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { change } from "redux-form";

export const authActionTypes = {
    AUTH_LOGIN_PENDING: "AUTH_LOGIN_PENDING",
    AUTH_LOGIN_SUCCESSFUL: "AUTH_LOGIN_SUCCESSFUL",
    AUTH_LOGIN_ERROR: "AUTH_LOGIN_ERROR",
    AUTH_SET_TOKEN: "AUTH_SET_TOKEN",
    AUTH_CLEAR_TOKEN: "AUTH_CLEAR_TOKEN",
    SIGNUP_PENDING: "SIGNUP_PENDING",
    SIGNUP_SUCCESSFUL: "SIGNUP_SUCCESSFUL",
    SIGNUP_ERROR: "SIGNUP_ERROR"
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

export const submitAuth = (primaryEmail: string, password: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_LOGIN_PENDING,
        payload: {}
    });

    try {
        await authService.login(primaryEmail, password);
        history.push('/');
    } catch (e) {
        dispatch({
            type: authActionTypes.AUTH_LOGIN_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const signup = (primaryEmail: string, firstName: string, lastName: string, password: string, confirmPassword: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.SIGNUP_PENDING,
        payload: {}
    });

    try {
        await authService.signup(primaryEmail, firstName, lastName, password, confirmPassword);
        history.push('/');
    } catch (e) {
        dispatch({
            type: authActionTypes.SIGNUP_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const recaptcha = (recaptchaResponse: string) => async (dispatch: Dispatch<any>) => {
    try {
        const response = await authService.recaptcha(recaptchaResponse);
        dispatch(change('signupForm', 'recaptcha', response.data.success));
    } catch (e) {
        dispatch(change('signupForm', 'recaptcha', false));
    }
}

export const emailVerification = (token: string) => async (dispatch: Dispatch<any>) => {
    try {
        const response = await authService.emailVerification(token);
        setTimeout(()=>{
            history.push('/');
        }, 3000);
        dispatch(change('emailVerification', 'response', response.data));
    } catch (e) {
        dispatch(change('emailVerification', 'response', false));
    }
}