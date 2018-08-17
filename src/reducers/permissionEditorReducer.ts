import {initialState, StatePermissionEditor, StatePermissions} from "../store/initialState";
import { permissionsActionTypes } from "../actions/permissionsActions";

export function permissionEditorReducer(state = initialState.permissionEditor, action: {type: string, payload: any}): StatePermissionEditor {
    switch (action.type) {
        case permissionsActionTypes.PERMISSIONS_EDITOR_LOAD_INITIAL_PERMISSION: {
            const {permission} = action.payload;
            return {
                isPending: true,
                isError: false,
                initialPermission: permission,
                errorMessage: null
            };
        }
        case permissionsActionTypes.PERMISSIONS_SAVE_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                initialPermission: null
            };
        }
        case permissionsActionTypes.PERMISSIONS_SAVE_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: action.payload.message,
                initialPermission: null
            };
        }
        case permissionsActionTypes.PERMISSIONS_SAVE_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                initialPermission: null
            };
        }
        default: {
            return state;
        }
    }
}