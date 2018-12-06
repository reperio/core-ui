import {initialState, StateRoleManagement} from "../store/initialState";
import { rolesActionTypes } from "../actions/rolesActions";

export function roleManagementReducer(state = initialState.roleManagement, action: {type: string, payload: any}): StateRoleManagement {
    switch (action.type) {
        case rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_SUCCESS: {
            const {roleViewModel, permissions} = action.payload;
            return {
                isPending: true,
                isError: false,
                initialRole: roleViewModel,
                errorMessage: null
            };
        }
        case rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_ERROR: {
            return {
                isPending: false,
                isError: true,
                initialRole: null,
                errorMessage: action.payload.message
            };
        }
        case rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_PENDING: {
            return {
                isPending: true,
                isError: false,
                initialRole: null,
                errorMessage: null
            };
        }
        case rolesActionTypes.ROLES_SAVE_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                initialRole: state.initialRole
            };
        }
        case rolesActionTypes.ROLES_SAVE_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                initialRole: null
            };
        }
        case rolesActionTypes.ROLES_SAVE_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                initialRole: state.initialRole
            };
        }
        case rolesActionTypes.ROLE_MANAGEMENT_REMOVE_PERMISSION_INITIAL_ROLE: {
            const {index} = action.payload;
            const newList = state.initialRole.selectedPermissions.filter((x:any, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                initialRole: Object.assign({}, state.initialRole, {
                    selectedPermissions: newList
                }),
                errorMessage: null
            };
        }
        case rolesActionTypes.ROLES_MANAGEMENT_ADD_PERMISSION_INITIAL_ROLE: {
            const {permission} = action.payload;
            const newList = state.initialRole.selectedPermissions.concat([permission]);
            return {
                isPending: true,
                isError: false,
                initialRole: Object.assign({}, state.initialRole, {
                    selectedPermissions: newList
                }),
                errorMessage: null
            };
        }
        case rolesActionTypes.CLEAR_ROLE_MANAGEMENT: {
            return {
                isPending: false,
                isError: false,
                initialRole: null,
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}