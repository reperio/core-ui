import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { userService } from "../services/userService";
import { change, formValueSelector, arrayPush, arrayRemove } from "redux-form";
import { store } from "../store/store";

export const usersActionTypes = {
    USERS_GET_PENDING: "USERS_GET_PENDING",
    USERS_GET_SUCCESS: "USERS_GET_SUCCESS",
    USERS_GET_ERROR: "USERS_GET_ERROR",
    USERS_CREATE_PENDING: "USERS_CREATE_PENDING",
    USERS_CREATE_SUCCESS: "USERS_CREATE_SUCCESS",
    USERS_CREATE_ERROR: "USERS_CREATE_ERROR",
    USERS_EDIT_PENDING: "USERS_EDIT_PENDING",
    USERS_EDIT_SUCCESS: "USERS_EDIT_SUCCESS",
    USERS_EDIT_ERROR: "USERS_EDIT_ERROR"
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

export const editUser = (userId: string, primaryEmail: string, firstName: string, lastName: string, organizationIds: string[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_EDIT_PENDING
    });

    try {
        const user = await userService.editUser(userId, primaryEmail, firstName, lastName, organizationIds);
        dispatch({
            type: usersActionTypes.USERS_EDIT_SUCCESS,
            payload: user.data
        });
        history.push('/users');
    } catch (e) {
        dispatch({
            type: usersActionTypes.USERS_EDIT_ERROR,
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
            type: usersActionTypes.USERS_CREATE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const selectOrganization = (something: any) => (dispatch: Dispatch<any>) => {
    dispatch(change('userManagementForm', 'selectedOrganization', {name: something.label, id: something.value}));
}

export const addOrganization = (something: any) => (dispatch: Dispatch<any>) => {
    if (something.id != null) {
        dispatch(arrayPush('userManagementForm', 'organizations', something));
    }
}

export const removeOrganization = (id: any) => (dispatch: Dispatch<any>) => {
    dispatch(arrayRemove('userManagementForm', 'organizations', id));
}

export const populateUserOrganizations = (userOrganizations: any, adminUserOrganizations: any) => (dispatch: Dispatch<any>) => {

    const adminOrganizations = adminUserOrganizations
        .map((userOrganization:any) => { 
            return {
                name: userOrganization.organization.name, id: userOrganization.organization.id
            }
        });

    const adminOrganizationIds = adminOrganizations.map((organization:any) => organization.id);
    const visibleOrganizations = userOrganizations
        .filter((userOrganization:any) => {
            return adminOrganizationIds.includes(userOrganization.id)
        })
    dispatch(change('userManagementForm', 'organizations', visibleOrganizations));
}