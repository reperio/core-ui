import {initialState, StateUserManagement} from "../store/initialState";
import { usersActionTypes } from "../actions/usersActions";

export function userManagementReducer(state = initialState.userManagement, action: {type: string, payload: any}): StateUserManagement {
    switch (action.type) {
        case usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER: {
            const {user} = action.payload;
            return {
                isPending: true,
                isError: false,
                initialUser: user.data,
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
        default: {
            return state;
        }
    }
}