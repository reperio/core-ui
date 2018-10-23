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
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING: {
            return {
                isPending: true,
                isError: false,
                initialUser: null,
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_ERROR: {
            return {
                isPending: false,
                isError: true,
                initialUser: null,
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_REMOVE_ORGANIZATION_INITIAL_USER: {
            const {index} = action.payload;
            const newList = state.initialUser.selectedOrganizations.filter((selectedOrganization: Dropdown, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    selectedOrganizations: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_ADD_ORGANIZATION_INITIAL_USER: {
            const {organization} = action.payload;
            const newList = state.initialUser.selectedOrganizations.concat([organization]);
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    selectedOrganizations: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_SHOW_INITIAL_USER_ROLE_DETAIL: {
            const {index} = action.payload;
            const newList = state.initialUser.selectedRoles;
            if (newList.length != 0) {
                newList[index].role.visible ? newList[index].role.visible = !newList[index].role.visible : newList[index].role.visible = true;
            }
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    selectedRoles: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_REMOVE_ROLE_INITIAL_USER: {
            const {index} = action.payload;
            const newList = state.initialUser.selectedRoles.filter((selectedRole: SelectedRole, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    selectedRoles: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_ADD_ROLE_INITIAL_USER: {
            const {payload} = action.payload;
            const newList = state.initialUser.selectedRoles.concat([payload]);
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    selectedRoles: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_REMOVE_EMAIL_INITIAL_USER: {
            const {index} = action.payload;
            const newList = state.initialUser.userEmails.filter((userEmail: UserEmail, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    userEmails: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_ADD_EMAIL_INITIAL_USER: {
            const {email} = action.payload;
            const newList = state.initialUser.userEmails.concat([{email, emailVerified: false, deleted: false, id: null, userId: null, user: null, primary: false}]);
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    userEmails: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_SET_PRIMARY_EMAIL_INITIAL_USER: {
            const {index} = action.payload;
            const newList = state.initialUser.userEmails;

            newList.forEach((userEmail: UserEmail) => {
                userEmail.primary = false;
            });

            newList[index].primary = true;

            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    userEmails: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.CLEAR_USER_MANAGEMENT: {
            return {
                isPending: false,
                isError: false,
                initialUser: null,
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}