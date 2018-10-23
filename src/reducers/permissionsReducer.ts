import {initialState, StatePermissions} from "../store/initialState";
import { permissionsActionTypes } from "../actions/permissionsActions";

export function permissionsReducer(state = initialState.permissions, action: {type: string, payload: any}): StatePermissions {
    switch (action.type) {
        case permissionsActionTypes.PERMISSIONS_GET_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                permissions: []
            };
        }
        case permissionsActionTypes.PERMISSIONS_GET_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                permissions: action.payload
            };
        }
        case permissionsActionTypes.PERMISSIONS_GET_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                permissions: []
            };
        }
        case permissionsActionTypes.CLEAR_PERMISSIONS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                permissions: []
            };
        }
        default: {
            return state;
        }
    }
}