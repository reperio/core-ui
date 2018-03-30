import {initialState, StateAuthSession} from "../store/initialState";
import { authActionTypes } from "../actions/authActions";

export function authSessionReducer(state = initialState.authSession, action: {type: string, payload: any}): StateAuthSession {
    switch (action.type) {
        case authActionTypes.AUTH_LOGIN_PENDING: {
            return {
                isPending: true,
                isAuthenticated: false,
                isError: false,
                errorMessage: null,
                user: null
            };
        }
        case authActionTypes.AUTH_LOGIN_SUCCESSFUL: {
            return {
                isPending: false,
                isAuthenticated: true,
                isError: false,
                errorMessage: null,
                user: action.payload.user
            };
        }
        case authActionTypes.AUTH_LOGIN_ERROR: {
            return {
                isPending: false,
                isAuthenticated: false,
                isError: true,
                errorMessage: action.payload.message,
                user: null
            };
        }
        case authActionTypes.AUTH_SET_TOKEN: {
            if (action.payload.user != null) {
                return {
                    isPending: false,
                    isAuthenticated: true,
                    isError: false,
                    errorMessage: null,
                    user: Object.assign({}, action.payload.user)
                };
            } else {
                return {
                    isPending: false,
                    isAuthenticated: false,
                    isError: false,
                    errorMessage: null,
                    user: null
                };
            }
        }
        case authActionTypes.AUTH_CLEAR_TOKEN: {
            return {
                isPending: false,
                isAuthenticated: false,
                isError: false,
                errorMessage: null,
                user: null
            };
        }
        default: {
            return state;
        }
    }
}