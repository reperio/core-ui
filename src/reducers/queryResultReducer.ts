import {initialState, StateUsers, StateQueryResult} from "../store/initialState";
import { usersActionTypes } from "../actions/usersActions";

export function queryResultReducer(state = initialState.queryResult, action: {type: string, payload: any}): StateQueryResult {
    switch (action.type) {
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
        default: {
            return state;
        }
    }
}