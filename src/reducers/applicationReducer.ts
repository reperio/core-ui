import {initialState, StateApplication} from "../store/initialState";
import { applicationActionTypes } from "../actions/applicationActions";

export function applicationReducer(state = initialState.applications, action: {type: string, payload: any}): StateApplication {
    switch (action.type) {
        case applicationActionTypes.GET_ALL_APPLICATIONS_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                applications: null
            };
        }
        case applicationActionTypes.GET_ALL_APPLICATIONS_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                applications: action.payload.applications
            };
        }
        case applicationActionTypes.GET_ALL_APPLICATIONS_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                applications: null
            };
        }
        default: {
            return state;
        }
    }
}