import { Dispatch } from "react-redux";
import { history } from '../store/history';
import { reset, change } from "redux-form";
import Dropdown from "../models/dropdown";
import { coreApiService } from "../services/coreApiService";
import { Organization, User } from "@reperio/core-connector";
import { OrganizationViewModel } from "../models/organizationViewModel";
import { State } from "../store/initialState";
import { organizationsActionTypes } from "../actionTypes/organizationActionTypes";

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
        type: organizationsActionTypes.ORGANIZATIONS_GET_PENDING
    });

    try {
        const organizations: Organization[] = (await coreApiService.organizationService.getOrganizations()).data;
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_GET_SUCCESS,
            payload: organizations
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

export const loadManagementInitialOrganization = (organizationId: string) => async (dispatch: Dispatch<any>, getState: ()=> State) => {
    try {
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_PENDING
        });

        const organizationViewModel: OrganizationViewModel = {
            organization: organizationId != null ? (await coreApiService.organizationService.getOrganizationById(organizationId)).data : null,
            selectedUsers: []
        };
    
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_SUCCESS,
            payload: { organizationViewModel }
        });
    
        dispatch(reset("organizationManagement"))
    } 
    catch(e) {
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const removeUserFromOrganization = (userId: string) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATION_MANAGEMENT_REMOVE_USER_INITIAL_ORGANIZATION,
        payload: { userId }
    });
}

export const selectUser = (user: Dropdown) => (dispatch: Dispatch<any>) => {
    dispatch(change('organizationManagementForm', 'selectedUser', user.value ? { name: user.label, id: user.value } : ""));
}

export const addUser = (selectedUser: Dropdown) => (dispatch: Dispatch<any>, getState: () => State) => {
    if (selectedUser != null) {
        const user = getState().users.users.filter((user: User) => user.id == selectedUser.value)[0];
        dispatch({
            type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_ADD_USER_INITIAL_ORGANIZATION,
            payload: { user }
        });
        dispatch(change('organizationManagementForm', 'selectedUser', null));
    }
}

export const editOrganization = (organizationId: string, name: string, userIds: string[]) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_SAVE_PENDING
    });

    try {
        await coreApiService.organizationService.editOrganization(organizationId, name, userIds);

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

export const createOrganization = (name: string, userIds: string[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_CREATE_PENDING
    });

    try {
        await coreApiService.organizationService.createOrganization(name, userIds);

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

export const deleteOrganization = (organizationId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: organizationsActionTypes.ORGANIZATIONS_DELETE_PENDING
    });

    try {
        await coreApiService.organizationService.deleteOrganization(organizationId);

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