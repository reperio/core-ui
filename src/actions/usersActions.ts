import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { userService } from "../services/userService";
import { change, reset, formValueSelector } from "redux-form";
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
    USERS_EDIT_ERROR: "USERS_EDIT_ERROR",
    USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS: "USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS",
    USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING: "USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING",
    USERS_MANAGEMENT_LOAD_INITIAL_USER_ERROR: "USERS_MANAGEMENT_LOAD_INITIAL_USER_ERROR",
    USERS_MANAGEMENT_REMOVE_ORGANIZATION_INITIAL_USER: "USERS_MANAGEMENT_REMOVE_ORGANIZATION_INITIAL_USER",
    USERS_MANAGEMENT_ADD_ORGANIZATION_INITIAL_USER: "USERS_MANAGEMENT_ADD_ORGANIZATION_INITIAL_USER",
    USERS_MANAGEMENT_SHOW_INITIAL_USER_ROLE_DETAIL: "USERS_MANAGEMENT_SHOW_INITIAL_USER_ROLE_DETAIL",
    USERS_MANAGEMENT_ADD_ROLE_INITIAL_USER: "USERS_MANAGEMENT_ADD_ROLE_INITIAL_USER",
    USERS_MANAGEMENT_REMOVE_ROLE_INITIAL_USER: "USERS_MANAGEMENT_REMOVE_ROLE_INITIAL_USER",
    USERS_MANAGEMENT_REMOVE_EMAIL_INITIAL_USER: "USERS_MANAGEMENT_REMOVE_EMAIL_INITIAL_USER",
    USERS_MANAGEMENT_ADD_EMAIL_INITIAL_USER: "USERS_MANAGEMENT_ADD_EMAIL_INITIAL_USER",
    USERS_MANAGEMENT_SET_PRIMARY_EMAIL_INITIAL_USER: "USERS_MANAGEMENT_SET_PRIMARY_EMAIL_INITIAL_USER",
    CLEAR_USERS: "CLEAR_USERS",
    CLEAR_USER_MANAGEMENT: "CLEAR_USER_MANAGEMENT"
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

export const editUser = (userId: string, firstName: string, lastName: string, organizationIds: string[], roleIds: string[], userEmails: any[], primaryEmailAddress: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_EDIT_PENDING
    });

    try {
        const user = await userService.editUser(userId, firstName, lastName, organizationIds, roleIds, userEmails.map((x: any) => { return {id: x.id, email: x.email}}), primaryEmailAddress.length > 0 ? primaryEmailAddress[0].email : null);
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

export const createUser = (primaryEmailAddress: string, firstName: string, lastName: string, password: string, confirmPassword: string, organizationIds: string[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_CREATE_PENDING
    });

    try {
        const user = await userService.createUser(primaryEmailAddress, firstName, lastName, password, confirmPassword, organizationIds);
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

export const clearManagementInitialUser = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING,
        payload: { user: {data: null as any }, organizations: {data: null as any}}
    });
};

export const loadManagementInitialUser = (userId: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING
        });

        let user = userId != null ? await userService.getUserById(userId) : null;
        user.data.selectedOrganizations = user.data.userOrganizations
            .map((userOrganization:any) => {
                return {
                    value: userOrganization.organization.id, 
                    label: (userOrganization.organization.personal ? 'Personal - ' : '') + userOrganization.organization.name
                }
            })
            .sort((a: any, b: any) => a.label.localeCompare(b.label));
    
        user.data.selectedRoles = user.data.userRoles.map((userRole: any) => {
            return {
                value: userRole.role.id, 
                label: userRole.role.name,
                role: userRole.role,
                organizationId: userRole.role.organizationId
            }
        });
    
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS,
            payload: { user }
        });
        dispatch(reset("userManagement"));
    }
    catch (e) {
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const selectOrganization = (organization: any) => (dispatch: Dispatch<any>) => {
    dispatch(change('userManagementForm', 'selectedOrganization', organization.value ? {name: organization.label, id: organization.value} : ""));
}

export const selectRole = (role: any) => (dispatch: Dispatch<any>) => {
    dispatch(change('userManagementForm', 'selectedOrganization', role.value ? {name: role.label, id: role.value} : ""));
}

export const addOrganization = (organization: any) => (dispatch: Dispatch<any>) => {
    if (organization != null) {
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_ADD_ORGANIZATION_INITIAL_USER,
            payload: { organization }
        });
        dispatch(change('userManagementForm', 'selectedOrganization', null));
    }
}

export const removeOrganization = (index: any) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_REMOVE_ORGANIZATION_INITIAL_USER,
        payload: { index }
    });
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

export const toggleRoleDetails = (index: number) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_SHOW_INITIAL_USER_ROLE_DETAIL,
        payload: { index }
    });
}

export const addRole = (role: any, roles: any[]) => (dispatch: Dispatch<any>) => {

    if (role != null) {
        const matchedRole = roles.filter((x: any) => x.id == role.value)[0];
        const payload = {
            label: role.label,
            value: role.value,
            role: matchedRole,
            organizationId: matchedRole.organizationId
        }
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_ADD_ROLE_INITIAL_USER,
            payload: { payload }
        });
        dispatch(change('userManagementForm', 'selectedRole', null));
    }
}

export const removeRole = (index: any) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_REMOVE_ROLE_INITIAL_USER,
        payload: { index }
    });
}

export const removeEmailAddress = (index: any) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_REMOVE_EMAIL_INITIAL_USER,
        payload: { index }
    });
}

export const setPrimaryEmailAddress = (index: any) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_SET_PRIMARY_EMAIL_INITIAL_USER,
        payload: { index }
    });
}

export const addEmailAddress = () => (dispatch: Dispatch<any>) => {
    const state = store.getState();

    const selector = formValueSelector('userManagementForm');

    const email = selector(state, 'email');
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_ADD_EMAIL_INITIAL_USER,
        payload: { email }
    });
}