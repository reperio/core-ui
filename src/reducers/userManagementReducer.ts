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
            const newList = state.initialUser.adminOrganizations.filter((x:any, i: number) => {
                return i != index;
            });
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    adminOrganizations: newList
                }),
                errorMessage: null
            };
        }
        case usersActionTypes.USERS_MANAGEMENT_ADD_ORGANIZATION_INITIAL_USER: {
            const {organization} = action.payload;
            const newList = state.initialUser.adminOrganizations.concat([organization]);
            return {
                isPending: true,
                isError: false,
                initialUser: Object.assign({}, state.initialUser, {
                    adminOrganizations: newList
                }),
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}