import {initialState, StateUserManagement} from "../store/initialState";
import { usersActionTypes } from "../actions/usersActions";
import { User, Role, UserEmail, Organization } from "@reperio/core-connector";
import { UserViewModel } from "../models/userViewModel";

export function userManagementReducer(state = initialState.userManagement, action: {type: string, payload: any}): StateUserManagement {
    switch (action.type) {
        case usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS: {
            const userViewModel: UserViewModel = action.payload.userViewModel;
            return {
                isPending: false,
                isError: false,
                initialUser: userViewModel,
                errorMessage: null,
                user: userViewModel
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING: {
            return {
                isPending: true,
                isError: false,
                initialUser: null,
                errorMessage: null,
                user: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_ERROR: {
            return {
                isPending: false,
                isError: true,
                initialUser: null,
                errorMessage: null,
                user: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_REMOVE_ORGANIZATION: {
            const {index} = action.payload;
            const newList = state.user.selectedOrganizations.filter((selectedOrganization: Organization, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                user: Object.assign({}, state.user, {
                    selectedOrganizations: newList
                }),
                errorMessage: null,
                initialUser: state.initialUser
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_ADD_ORGANIZATION: {
            const {organization} = action.payload;
            const newList = state.user.selectedOrganizations.concat([organization]);
            return {
                isPending: true,
                isError: false,
                user: Object.assign({}, state.user, {
                    selectedOrganizations: newList
                }),
                errorMessage: null,
                initialUser: state.initialUser
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_REMOVE_ROLE: {
            const {index} = action.payload;
            const newList = state.user.selectedRoles.filter((selectedRole: Role, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                user: Object.assign({}, state.user, {
                    selectedRoles: newList
                }),
                errorMessage: null,
                initialUser: state.initialUser
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_ADD_ROLE: {
            const {role} = action.payload;
            const newList = state.user.selectedRoles.concat([role]);
            return {
                isPending: true,
                isError: false,
                user: Object.assign({}, state.user, {
                    selectedRoles: newList
                }),
                errorMessage: null,
                initialUser: state.initialUser
            };
        }
        case usersActionTypes.CLEAR_USER_MANAGEMENT: {
            return {
                isPending: false,
                isError: false,
                user: null,
                errorMessage: null,
                initialUser: null
            };
        }
        case usersActionTypes.RESET_USER_MANAGEMENT: {
            return {
                isPending: state.isPending,
                isError: state.isError,
                user: state.initialUser,
                errorMessage: state.errorMessage,
                initialUser: state.initialUser
            };
        }
        default: {
            return state;
        }
    }
}