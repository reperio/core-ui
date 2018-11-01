import {initialState, StateUserManagement} from "../store/initialState";
import { usersActionTypes } from "../actions/usersActions";
import UserEmail from "../models/userEmail";
import User from "../models/user";
import SelectedRole from "../models/selectedRole";
import Dropdown from "../models/dropdown";

export function userManagementReducer(state = initialState.userManagement, action: {type: string, payload: any}): StateUserManagement {
    switch (action.type) {
        case usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS: {
            const user: User = action.payload.user;

            if (user) {
                user.userEmails.forEach((userEmail: UserEmail) => {
                    userEmail.primary = userEmail.email === user.primaryEmailAddress ? true : false
                });
                user.userEmails = user.userEmails.filter((userEmail: UserEmail) => !userEmail.deleted);
            }

            return {
                isPending: false,
                isError: false,
                initialUser: user,
                errorMessage: null,
                user
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
            const newList = state.user.selectedOrganizations.filter((selectedOrganization: Dropdown, i: number) => {
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
        case usersActionTypes.USERS_MANAGEMENT_SHOW_ROLE_DETAIL: {
            const {index} = action.payload;
            const newList = state.user.selectedRoles;
            if (newList.length != 0) {
                newList[index].role.visible ? newList[index].role.visible = !newList[index].role.visible : newList[index].role.visible = true;
            }
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
        case usersActionTypes.USERS_MANAGEMENT_REMOVE_ROLE: {
            const {index} = action.payload;
            const newList = state.user.selectedRoles.filter((selectedRole: SelectedRole, i: number) => {
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
            const {payload} = action.payload;
            const newList = state.user.selectedRoles.concat([payload]);
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
        case usersActionTypes.USERS_MANAGEMENT_REMOVE_EMAIL: {
            const {index} = action.payload;
            const newList = state.user.userEmails.filter((userEmail: UserEmail, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                user: Object.assign({}, state.user, {
                    userEmails: newList
                }),
                errorMessage: null,
                initialUser: state.initialUser
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_ADD_EMAIL: {
            const {email} = action.payload;
            const newList = state.user.userEmails.concat([{email, emailVerified: false, deleted: false, id: null, userId: null, user: null, primary: false}]);
            return {
                isPending: true,
                isError: false,
                user: Object.assign({}, state.user, {
                    userEmails: newList
                }),
                errorMessage: null,
                initialUser: state.initialUser
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_SET_PRIMARY_EMAIL: {
            const {index} = action.payload;
            const newList = state.initialUser.userEmails;

            newList.forEach((userEmail: UserEmail) => {
                userEmail.primary = false;
            });

            newList[index].primary = true;

            return {
                isPending: true,
                isError: false,
                user: Object.assign({}, state.user, {
                    userEmails: newList
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