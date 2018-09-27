import { Dispatch } from "react-redux";
import { history } from '../store/history';
import { organizationService } from "../services/organizationService";
import { reset, change } from "redux-form";
import { userService } from "../services/userService";

export const organizationsActionTypes = {
    ORGANIZATIONS_GET_PENDING: "ORGANIZATIONS_GET_PENDING",
    ORGANIZATIONS_GET_SUCCESS: "ORGANIZATIONS_GET_SUCCESS",
    ORGANIZATIONS_GET_ERROR: "ORGANIZATIONS_GET_ERROR",
    ORGANIZATIONS_SAVE_PENDING: "ORGANIZATIONS_SAVE_PENDING",
    ORGANIZATIONS_SAVE_SUCCESS: "ORGANIZATIONS_SAVE_SUCCESS",
    ORGANIZATIONS_SAVE_ERROR: "ORGANIZATIONS_SAVE_ERROR",
    ORGANIZATIONS_DELETE_PENDING: "ORGANIZATIONS_DELETE_PENDING",
    ORGANIZATIONS_DELETE_SUCCESS: "ORGANIZATIONS_DELETE_SUCCESS",
    ORGANIZATIONS_DELETE_ERROR: "ORGANIZATIONS_DELETE_ERROR",
    ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION: "ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION",
    ORGANIZATION_MANAGEMENT_REMOVE_USER_INITIAL_ORGANIZATION: "ORGANIZATION_MANAGEMENT_REMOVE_USER_INITIAL_ORGANIZATION",
    ORGANIZATIONS_MANAGEMENT_ADD_USER_INITIAL_ORGANIZATION: "ORGANIZATIONS_MANAGEMENT_ADD_USER_INITIAL_ORGANIZATION",
    ORGANIZATIONS_CREATE_PENDING: "ORGANIZATIONS_CREATE_PENDING",
    ORGANIZATIONS_CREATE_SUCCESS: "ORGANIZATIONS_CREATE_SUCCESS",
    ORGANIZATIONS_CREATE_ERROR: "ORGANIZATIONS_CREATE_ERROR",
    ORGANIZATIONS_MANAGEMENT_SHOW_INITIAL_ORGANIZATION_USER_DETAIL: "ORGANIZATIONS_MANAGEMENT_SHOW_INITIAL_ORGANIZATION_USER_DETAIL" 
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

export const clearManagementInitialOrganization = () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION,
        payload: { organization: {data: null as any }, users: {data: null as any}}
    });
};

export const loadManagementInitialOrganization = (organizationId: string) => async (dispatch: Dispatch<any>) => {
    const organization = organizationId != null ? await organizationService.getOrganizationById(organizationId) : null;
    const users = await userService.getUsers();

    organization.data.selectedUsers = organization.data.userOrganizations
        .map((userOrganization:any) => {
            return {
                value: userOrganization.user.id, 
                label: `${userOrganization.user.firstName} ${userOrganization.user.lastName} - ${userOrganization.user.primaryEmailAddress}`
            }
        })
        .sort((a: any, b: any) => a.label.localeCompare(b.label));

    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION,
        payload: { organization, users }
    });

    dispatch(reset("organizationManagement"))
};

export const removeUserFromOrganization = (index: any) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATION_MANAGEMENT_REMOVE_USER_INITIAL_ORGANIZATION,
        payload: { index }
    });
}

export const selectUser = (user: any) => (dispatch: Dispatch<any>) => {
    dispatch(change('organizationManagementForm', 'selectedUser', user.value ? {name: user.label, id: user.value} : ""));
}

export const addUser = (user: any) => (dispatch: Dispatch<any>) => {
    if (user != null) {
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_ADD_USER_INITIAL_ORGANIZATION,
            payload: { user }
        });
        dispatch(change('organizationManagementForm', 'selectedUser', null));
    }
}

export const editOrganization = (id: string, name: string, userIds: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_SAVE_PENDING
    });

    try {
        await organizationService.editOrganization(id, {name, userIds});

        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_SAVE_SUCCESS

        });
        history.push('/organizations');
    } catch (e) {
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_SAVE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const createOrganization = (name: string, userIds: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_CREATE_PENDING
    });

    try {
        await organizationService.createOrganization({name, personal: false, userIds: userIds ? userIds.map((x:any) => x.value) : []});

        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_CREATE_SUCCESS

        });
        history.push('/organizations');
    } catch (e) {
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_CREATE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const deleteOrganization = (id: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_DELETE_PENDING
    });

    try {
        await organizationService.deleteOrganization(id);

        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_DELETE_SUCCESS

        });
        history.push('/organizations');
    } catch (e) {
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_DELETE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};