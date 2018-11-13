import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { State } from '../store/initialState';

import { authService } from "../services/authService";
import { userService } from "../services/userService";
import { change } from "redux-form";
import User from "../models/user";

export const authActionTypes = {
    AUTH_LOGIN_PENDING: "AUTH_LOGIN_PENDING",
    AUTH_LOGIN_SUCCESSFUL: "AUTH_LOGIN_SUCCESSFUL",
    AUTH_LOGIN_ERROR: "AUTH_LOGIN_ERROR",
    AUTH_SET_TOKEN: "AUTH_SET_TOKEN",
    AUTH_CLEAR_TOKEN: "AUTH_CLEAR_TOKEN",
    SIGNUP_PENDING: "SIGNUP_PENDING",
    SIGNUP_SUCCESSFUL: "SIGNUP_SUCCESSFUL",
    SIGNUP_ERROR: "SIGNUP_ERROR",
    AUTH_FORGOT_PASSWORD_PENDING: "AUTH_FORGOT_PASSWORD_PENDING",
    AUTH_FORGOT_PASSWORD_SUCCESS: "AUTH_FORGOT_PASSWORD_SUCCESS",
    AUTH_FORGOT_PASSWORD_ERROR: "AUTH_FORGOT_PASSWORD_ERROR",
    AUTH_RESET_PASSWORD_PENDING: "AUTH_RESET_PASSWORD_PENDING",
    AUTH_RESET_PASSWORD_SUCCESS: "AUTH_RESET_PASSWORD_SUCCESS",
    AUTH_RESET_PASSWORD_ERROR: "AUTH_RESET_PASSWORD_ERROR",
    AUTH_SEND_VERIFICATION_EMAIL_PENDING: "AUTH_SEND_VERIFICATION_EMAIL_PENDING",
    AUTH_SEND_VERIFICATION_EMAIL_SUCCESS: "AUTH_SEND_VERIFICATION_EMAIL_SUCCESS",
    AUTH_SEND_VERIFICATION_EMAIL_ERROR: "AUTH_SEND_VERIFICATION_EMAIL_ERROR",
    AUTH_SET_USER: "AUTH_SET_USER"
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

export const setAuthToken = (authToken: string) => async (dispatch: Dispatch<any>, getState: () => State) => {
    const state = getState();
    const oldAuthToken = state.authSession.reperioCoreJWT;
    const oldParsedToken = oldAuthToken == null ? null : authService.parseJwt(oldAuthToken);

    const parsedToken = authToken == null ? null : authService.parseJwt(authToken);

    if (parsedToken != null && Math.round((new Date()).getTime() / 1000) < parsedToken.exp) {
        // if the provided authToken is not null and it's not expired...

        dispatch({
            type: authActionTypes.AUTH_SET_TOKEN,
            payload: {authToken}
        });

        if (oldParsedToken == null || oldParsedToken.currentUserId !== parsedToken.currentUserId) {
            // if we're forcing the action dispatch, or the old auth token was null, or the new auth token has a different user...

            await executeWithLoadedToken()(dispatch, getState);
        }
    } else {
        // if the provided authToken is null or it's expired...

        dispatch({
            type: authActionTypes.AUTH_CLEAR_TOKEN,
            payload: null
        });
    }
};

export const executeWithLoadedToken = () => async (dispatch: Dispatch<any>, getState: () => State) => {
    const state = getState();
    const authToken = state.authSession.reperioCoreJWT;

    const parsedToken = authToken == null ? null : authService.parseJwt(authToken);
    const user: User = (await userService.getUserById(parsedToken.currentUserId)).data;
    dispatch({
        type: authActionTypes.AUTH_SET_USER,
        payload: {user}
    });
};

export const setAuth = (user: User) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_LOGIN_SUCCESSFUL,
        payload: {user}
    });
};

export const submitAuth = (primaryEmailAddress: string, password: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_LOGIN_PENDING,
        payload: {}
    });

    try {
        await authService.login(primaryEmailAddress, password);
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

export const signup = (primaryEmailAddress: string, firstName: string, lastName: string, password: string, confirmPassword: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.SIGNUP_PENDING,
        payload: {}
    });

    try {
        await authService.signup(primaryEmailAddress, firstName, lastName, password, confirmPassword);
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
        const { data: response } = await authService.recaptcha(recaptchaResponse);
        dispatch(change('signupForm', 'recaptcha', response.success));
    } catch (e) {
        dispatch(change('signupForm', 'recaptcha', false));
    }
}

export const emailVerification = (token: string) => async (dispatch: Dispatch<any>) => {
    try {
        const { data: response } = await authService.emailVerification(token);
        setTimeout(()=>{
            history.push('/');
        }, 3000);
        dispatch(change('emailVerification', 'response', response));
    } catch (e) {
        dispatch(change('emailVerification', 'response', false));
    }
}

export const forgotPassword = (primaryEmailAddress: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_FORGOT_PASSWORD_PENDING
    });

    try {
        await authService.forgotPassword(primaryEmailAddress);

        dispatch({
            type: authActionTypes.AUTH_FORGOT_PASSWORD_SUCCESS
        });

        history.push('/');
    } catch (e) {
        dispatch({
            type: authActionTypes.AUTH_FORGOT_PASSWORD_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const verifyResetPassword = (token: string) => async (dispatch: Dispatch<any>) => {
    try {
        const { data: response } = await authService.verifyResetPassword(token);
        if (response == false) {
            setTimeout(()=>{
                history.push('/');
            }, 3000);
        }
        dispatch(change('resetPasswordVerified', 'response', response));
    } catch (e) {
        dispatch(change('resetPasswordVerified', 'response', false));
    }
}

export const resetPassword = (token: string, password: string, confirmPassword: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_RESET_PASSWORD_PENDING
    });

    try {
        await authService.resetPassword(token, password, confirmPassword);

        dispatch({
            type: authActionTypes.AUTH_RESET_PASSWORD_SUCCESS
        });

        history.push('/');
    } catch (e) {
        dispatch({
            type: authActionTypes.AUTH_RESET_PASSWORD_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
}

export const sendVerificationEmail = (userId: string, email: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_SEND_VERIFICATION_EMAIL_PENDING
    });

    try {
        await authService.sendVerificationEmail(userId, email);

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