import {initialState, StateRoles} from "../store/initialState";
import { rolesActionTypes } from "../actions/rolesActions";

export function rolesReducer(state = initialState.roles, action: {type: string, payload: any}): StateRoles {
    switch (action.type) {
        case rolesActionTypes.ROLES_GET_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                roles: []
            };
        }
        case rolesActionTypes.ROLES_GET_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                roles: action.payload
            };
        }
        case rolesActionTypes.ROLES_GET_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                roles: []
            };
        }
        case rolesActionTypes.ROLES_CREATE_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                roles: state.roles
            };
        }
        case rolesActionTypes.ROLES_CREATE_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                roles: []
            };
        }
        case rolesActionTypes.ROLES_CREATE_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                roles: state.roles
            };
        }
        default: {
            return state;
        }
    }
}