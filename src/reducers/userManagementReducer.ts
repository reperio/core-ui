import {initialState, StateUserManagement} from "../store/initialState";
import { usersActionTypes } from "../actions/usersActions";

export function userManagementReducer(state = initialState.userManagement, action: {type: string, payload: any}): StateUserManagement {
    switch (action.type) {
        case usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS: {
            const {user} = action.payload;

            if (user.data) {
                user.data.userEmails.forEach((userEmail: any) => {
                    userEmail.primary = userEmail.email === user.data.primaryEmailAddress ? true : false
                });
                user.data.userEmails = user.data.userEmails.filter((x:any) => !x.deleted);
            }

            return {
                isPending: false,
                isError: false,
                initialUser: user.data,
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
            const newList = state.initialUser.selectedOrganizations.filter((x:any, i: number) => {
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
            const newList = state.initialUser.selectedRoles.filter((x:any, i: number) => {
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
            const newList = state.initialUser.userEmails.filter((x:any, i: number) => {
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
            const newList = state.initialUser.userEmails.concat([{email, emailVerified: false}]);
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

            newList.forEach((element: any) => {
                element.primary = false;
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