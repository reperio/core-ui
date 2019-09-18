import {initialState, StateQueryResult} from "../store/initialState";

export function queryResultReducer(state = initialState.queryResult, action: {type: string, payload: any}): StateQueryResult {
    switch (action.type) {
        default: {
            return state;
        }
    }
}