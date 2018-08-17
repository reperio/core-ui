import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { userService } from "../services/userService";
import { change } from "redux-form";

export const usersActionTypes = {
    USERS_GET_PENDING: "USERS_GET_PENDING",
    USERS_GET_SUCCESS: "USERS_GET_SUCCESS",
    USERS_GET_ERROR: "USERS_GET_ERROR",
    USERS_CREATE_PENDING: "USERS_CREATE_PENDING",
    USERS_CREATE_SUCCESS: "USERS_CREATE_SUCCESS",
    USERS_CREATE_ERROR: "USERS_CREATE_ERROR"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        case 400:
        case 401:
        case 403:
        case 409:
            return "A user with that email already exists"
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getUsers = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_GET_PENDING
    });

    try {
        const users = await userService.getUsers();
        dispatch({
            type: usersActionTypes.USERS_GET_SUCCESS,
            payload: users.data
        });
    } catch (e) {
        dispatch({
            type: usersActionTypes.USERS_GET_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const createUser = (primaryEmail: string, firstName: string, lastName: string, password: string, confirmPassword: string, organizationIds: string[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_CREATE_PENDING
    });

    try {
        const user = await userService.createUser(primaryEmail, firstName, lastName, password, confirmPassword, organizationIds);
        dispatch({
            type: usersActionTypes.USERS_CREATE_SUCCESS,
            payload: user.data
        });
        history.push('/users');
    } catch (e) {
        dispatch({
            type: usersActionTypes.USERS_GET_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};