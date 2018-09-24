import {initialState, StateOrganizations} from "../store/initialState";
import { organizationsActionTypes } from "../actions/organizationsActions";

export function organizationsReducer(state = initialState.organizations, action: {type: string, payload: any}): StateOrganizations {
    switch (action.type) {
        case organizationsActionTypes.ORGANIZATIONS_GET_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                organizations: []
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_GET_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                organizations: action.payload
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_GET_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                organizations: []
            };
        }
        default: {
            return state;
        }
    }
}