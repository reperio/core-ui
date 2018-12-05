import {initialState, StateOrganizationManagement} from "../store/initialState";
import { organizationsActionTypes } from "../actions/organizationsActions";
import { User } from "@reperio/core-connector";

export function organizationManagementReducer(state = initialState.organizationManagement, action: {type: string, payload: any}): StateOrganizationManagement {
    switch (action.type) {
        case organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_SUCCESS: {
            const {organizationViewModel} = action.payload;
            return {
                isPending: false,
                isError: false,
                initialOrganization: organizationViewModel,
                errorMessage: null
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_PENDING: {
            return {
                isPending: true,
                isError: false,
                initialOrganization: null,
                errorMessage: null
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_ERROR: {
            return {
                isPending: false,
                isError: true,
                initialOrganization: null,
                errorMessage: action.payload.message
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_SAVE_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                initialOrganization: state.initialOrganization
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_SAVE_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                initialOrganization: null
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_SAVE_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                initialOrganization: state.initialOrganization
            };
        }
        case organizationsActionTypes.ORGANIZATION_MANAGEMENT_REMOVE_USER_INITIAL_ORGANIZATION: {
            const {userId} = action.payload;
            const newList = state.initialOrganization.selectedUsers.filter((user: User, i: number) => {
                return user.id != userId
            });
            return {
                isPending: true,
                isError: false,
                initialOrganization: Object.assign({}, state.initialOrganization, {
                    selectedUsers: newList
                }),
                errorMessage: null
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_ADD_USER_INITIAL_ORGANIZATION: {
            const {user} = action.payload;
            const newList = state.initialOrganization.selectedUsers.concat([user]);
            return {
                isPending: true,
                isError: false,
                initialOrganization: Object.assign({}, state.initialOrganization, {
                    selectedUsers: newList
                }),
                errorMessage: null
            };
        }
        case organizationsActionTypes.CLEAR_ORGANIZATION_MANAGEMENT: {
            return {
                isPending: false,
                isError: false,
                initialOrganization: null,
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}