import {initialState, StateAuthSession} from "../store/initialState";
import { authActionTypes } from "../actions/authActions";

export function authSessionReducer(state = initialState.authSession, action: {type: string, payload: any}): StateAuthSession {
    switch (action.type) {
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