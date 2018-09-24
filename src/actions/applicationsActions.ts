import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { applicationService } from "../services/applicationService";
import {reset} from "redux-form";

export const applicationsActionTypes = {
    APPLICATIONS_GET_PENDING: "APPLICATIONS_GET_PENDING",
    APPLICATIONS_GET_SUCCESS: "APPLICATIONS_GET_SUCCESS",
    APPLICATIONS_GET_ERROR: "APPLICATIONS_GET_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        case 400:
        case 401:
        case 403:
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getApplications = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: applicationsActionTypes.APPLICATIONS_GET_PENDING,
        payload: {}
    });

    try {
        const applications = await applicationService.getApplications();
        dispatch({
            type: applicationsActionTypes.APPLICATIONS_GET_SUCCESS,
            payload: applications.data
        });
    } catch (e) {
        dispatch({
            type: applicationsActionTypes.APPLICATIONS_GET_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};