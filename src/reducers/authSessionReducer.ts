import {initialState, StateAuthSession} from "../store/initialState";
import { authActionTypes } from "../actions/authActions";

export function authSessionReducer(state = initialState.authSession, action: {type: string, payload: any}): StateAuthSession {
    switch (action.type) {
        case authActionTypes.AUTH_LOGIN_PENDING: {
            return {
                ...state,
                isPending: true,
                isAuthenticated: false,
                isError: false,
                errorMessage: null,
                user: null
            };
        }
        case authActionTypes.AUTH_LOGIN_SUCCESSFUL: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: true,
                isError: false,
                otpIsPending: false,
                otpIsError: false,
                errorMessage: null,
                user: action.payload.user
            };
        }
        case authActionTypes.AUTH_LOGIN_ERROR: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: false,
                isError: true,
                otpIsPending: false,
                otpIsError: false,
                errorMessage: action.payload.message,
                user: null
            };
        }
        case authActionTypes.AUTH_OTP_LOGIN_PENDING: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: false,
                isError: false,
                otpIsPending: true,
                otpIsError: false,
                errorMessage: null,
                user: null
            };
        }
        case authActionTypes.AUTH_OTP_LOGIN_ERROR: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: false,
                isError: false,
                otpIsPending: false,
                otpIsError: true,
                errorMessage: action.payload.message,
                user: null
            };
        }
        case authActionTypes.AUTH_SET_USER: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: true,
                isError: false,
                errorMessage: null,
                user: action.payload.user != null ? Object.assign({}, action.payload.user) : null
            };
        }
        case authActionTypes.AUTH_SET_TOKEN: {
            return {
                ...state,
                reperioCoreJWT: action.payload.authToken
            };
        }
        case authActionTypes.AUTH_CLEAR_TOKEN: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: false,
                isError: false,
                errorMessage: null,
                user: null,
                reperioCoreJWT: null
            };
        }
        case authActionTypes.SIGNUP_PENDING: {
            return {
                ...state,
                isPending: true,
                isAuthenticated: false,
                isError: false,
                errorMessage: null,
                user: null
            };
        }
        case authActionTypes.SIGNUP_SUCCESSFUL: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: true,
                isError: false,
                errorMessage: null,
                user: action.payload.user
            };
        }
        case authActionTypes.SIGNUP_ERROR: {
            return {
                ...state,
                isPending: false,
                isAuthenticated: false,
                isError: true,
                errorMessage: action.payload.message,
                user: null
            };
        }
        case authActionTypes.AUTH_SET_IS_AUTH_INITIALIZED: {
            return {
                ...state,
                isAuthInitialized: true
            }
        }
        default: {
            return state;
        }
    }
}