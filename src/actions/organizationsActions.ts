import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { organizationService } from "../services/organizationService";
import {reset} from "redux-form";

export const organizationsActionTypes = {
    ORGANIZATIONS_GET_PENDING: "ORGANIZATIONS_GET_PENDING",
    ORGANIZATIONS_GET_SUCCESS: "ORGANIZATIONS_GET_SUCCESS",
    ORGANIZATIONS_GET_ERROR: "ORGANIZATIONS_GET_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        case 400:
        case 401:
        case 403:
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getOrganizations = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_GET_PENDING,
        payload: {}
    });

    try {
        const organizations = await organizationService.getOrganizations();
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_GET_SUCCESS,
            payload: organizations.data
        });
    } catch (e) {
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_GET_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};