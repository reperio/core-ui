import {initialState, StatePermissionManagement, StatePermissions} from "../store/initialState";
import { permissionsActionTypes } from "../actions/permissionsActions";

export function permissionManagementReducer(state = initialState.permissionManagement, action: {type: string, payload: any}): StatePermissionManagement {
    switch (action.type) {
        case permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_SUCCESS: {
            const {permission} = action.payload;
            return {
                isPending: false,
                isError: false,
                initialPermission: permission,
                errorMessage: null
            };
        }
        case permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_PENDING: {
            return {
                isPending: true,
                isError: false,
                initialPermission:  null,
                errorMessage: null
            };
        }
        case permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_ERROR: {
            return {
                isPending: false,
                isError: true,
                initialPermission: null,
                errorMessage: action.payload.message
            };
        }
        case permissionsActionTypes.PERMISSIONS_SAVE_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                initialPermission: state.initialPermission
            };
        }
        case permissionsActionTypes.PERMISSIONS_SAVE_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                initialPermission: null
            };
        }
        case permissionsActionTypes.PERMISSIONS_SAVE_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                initialPermission: state.initialPermission
            };
        }
        case permissionsActionTypes.PERMISSION_MANAGEMENT_REMOVE_ROLE_INITIAL_PERMISSION: {
            const {index} = action.payload;
            const newList = state.initialPermission.rolePermissions.filter((x:any, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                initialPermission: Object.assign({}, state.initialPermission, {
                    rolePermissions: newList
                }),
                errorMessage: null
            };
        }
        case permissionsActionTypes.CLEAR_PERMISSION_MANAGEMENT: {
            return {
                isPending: false,
                isError: false,
                initialPermission: null,
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}