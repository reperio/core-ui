import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { State } from '../store/initialState';

import { coreApiService } from "../services/coreApiService";
import { userService } from "../services/userService";
import { change } from "redux-form";
import User from "../models/user";

export const authActionTypes = {
    AUTH_LOGIN_PENDING: "AUTH_LOGIN_PENDING",
    AUTH_LOGIN_SUCCESSFUL: "AUTH_LOGIN_SUCCESSFUL",
    AUTH_LOGIN_ERROR: "AUTH_LOGIN_ERROR",
    AUTH_OTP_LOGIN_PENDING: "AUTH_OTP_LOGIN_PENDING",
    AUTH_OTP_LOGIN_ERROR: "AUTH_OTP_LOGIN_ERROR",
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
        await coreApiService.authService.login(primaryEmailAddress, password);
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

export const submitAuthWithOTP = (otp: string, next: string = null) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.AUTH_OTP_LOGIN_PENDING,
        payload: {}
    });

    try {
        await coreApiService.authService.authenticateWithOTP(otp);
        history.push(next != null ? next : '/');
    } catch (e) {
        dispatch({
            type: authActionTypes.AUTH_OTP_LOGIN_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
}

export const signup = (primaryEmailAddress: string, firstName: string, lastName: string, password: string, confirmPassword: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: authActionTypes.SIGNUP_PENDING,
        payload: {}
    });

    try {
        await coreApiService.authService.signup(primaryEmailAddress, firstName, lastName, password, confirmPassword);
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
        const { data: response } = await coreApiService.authService.recaptcha(recaptchaResponse);
        dispatch(change('signupForm', 'recaptcha', response.success));
    } catch (e) {
        dispatch(change('signupForm', 'recaptcha', false));
    }
}

export const emailVerification = (token: string) => async (dispatch: Dispatch<any>) => {
    try {
        const { data: response } = await coreApiService.authService.emailVerification(token);
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
        await coreApiService.authService.forgotPassword(primaryEmailAddress);

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
        const { data: response } = await coreApiService.authService.verifyResetPassword(token);
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
        await coreApiService.authService.resetPassword(token, password, confirmPassword);

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