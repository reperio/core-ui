import {initialState, StateUsers} from "../store/initialState";
import { usersActionTypes } from "../actions/usersActions";

export function usersReducer(state = initialState.users, action: {type: string, payload: any}): StateUsers {
    switch (action.type) {
        case usersActionTypes.USERS_GET_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                users: []
            };
        }
        case usersActionTypes.USERS_GET_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                users: action.payload
            };
        }
        case usersActionTypes.USERS_GET_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                users: []
            };
        }
        case usersActionTypes.CLEAR_USERS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                users: []
            };
        }
        default: {
            return state;
        }
    }
}