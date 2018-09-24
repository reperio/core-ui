import {initialState, StateApplications} from "../store/initialState";
import { applicationsActionTypes } from "../actions/applicationsActions";

export function applicationsReducer(state = initialState.applications, action: {type: string, payload: any}): StateApplications {
    switch (action.type) {
        case applicationsActionTypes.APPLICATIONS_GET_PENDING: {
            return {
                isPending: true,
                isError: false,
                errorMessage: null,
                applications: []
            };
        }
        case applicationsActionTypes.APPLICATIONS_GET_SUCCESS: {
            return {
                isPending: false,
                isError: false,
                errorMessage: null,
                applications: action.payload
            };
        }
        case applicationsActionTypes.APPLICATIONS_GET_ERROR: {
            return {
                isPending: false,
                isError: true,
                errorMessage: action.payload.message,
                applications: []
            };
        }
        default: {
            return state;
        }
    }
}