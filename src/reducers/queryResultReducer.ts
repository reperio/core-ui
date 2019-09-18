import {initialState, StateQueryResult} from "../store/initialState";
import { usersActionTypes } from "../actions/usersActions";
import { rolesActionTypes } from "../actions/rolesActions";
import { permissionsActionTypes } from "../actionTypes/permissionsActionTypes";
import { organizationsActionTypes } from "../actionTypes/organizationActionTypes";

export function queryResultReducer(state = initialState.queryResult, action: {type: string, payload: any}): StateQueryResult {
    switch (action.type) {
        case usersActionTypes.USERS_QUERY_GET_PENDING: {
            return {
                data: state.data,
                pages: state.pages
            };
        }
        case usersActionTypes.USERS_QUERY_GET_SUCCESS: {
            return {
                data: action.payload.data,
                pages: action.payload.pages
            };
        }
        case usersActionTypes.USERS_QUERY_GET_ERROR: {
            return {
                data: [],
                pages: 0
            };
        }
        case rolesActionTypes.ROLES_QUERY_GET_PENDING: {
            return {
                data: state.data,
                pages: state.pages
            };
        }
        case rolesActionTypes.ROLES_QUERY_GET_SUCCESS: {
            return {
                data: action.payload.data,
                pages: action.payload.pages
            };
        }
        case rolesActionTypes.ROLES_QUERY_GET_ERROR: {
            return {
                data: [],
                pages: 0
            };
        }
        case permissionsActionTypes.PERMISSIONS_QUERY_GET_PENDING: {
            return {
                data: state.data,
                pages: state.pages
            };
        }
        case permissionsActionTypes.PERMISSIONS_QUERY_GET_SUCCESS: {
            return {
                data: action.payload.data,
                pages: action.payload.pages
            };
        }
        case permissionsActionTypes.PERMISSIONS_QUERY_GET_ERROR: {
            return {
                data: [],
                pages: 0
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_QUERY_GET_PENDING: {
            return {
                data: state.data,
                pages: state.pages
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_QUERY_GET_SUCCESS: {
            return {
                data: action.payload.data,
                pages: action.payload.pages
            };
        }
        case organizationsActionTypes.ORGANIZATIONS_QUERY_GET_ERROR: {
            return {
                data: [],
                pages: 0
            };
        }
        default: {
            return state;
        }
    }
}