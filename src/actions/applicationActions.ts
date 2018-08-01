import {Dispatch} from "react-redux";
import { applicationService } from "../services/applicationService";

export const applicationActionTypes = {
    GET_ALL_APPLICATIONS_PENDING: "GET_ALL_APPLICATIONS_PENDING",
    GET_ALL_APPLICATIONS_SUCCESS: "GET_ALL_APPLICATIONS_SUCCESS",
    GET_ALL_APPLICATIONS_ERROR: "GET_ALL_APPLICATIONS_ERROR",
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        case 400:
        case 401:
        case 403:
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getAllApplications = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: applicationActionTypes.GET_ALL_APPLICATIONS_PENDING,
        payload: {}
    });

    try {
        const {data: applications} = await applicationService.getAllApplications();

        dispatch({
            type: applicationActionTypes.GET_ALL_APPLICATIONS_SUCCESS,
            payload: {
                applications
            }
        });

    } catch (e) {
        dispatch({
            type: applicationActionTypes.GET_ALL_APPLICATIONS_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};