import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { change, reset, formValueSelector } from "redux-form";
import { store } from "../store/store";
import { User, Role, Organization, QueryParameters, QueryResult} from '@reperio/core-connector';
import Dropdown from "../models/dropdown";
import { State } from "../store/initialState";
import { coreApiService } from "../services/coreApiService";
import { UserViewModel } from "../models/userViewModel";

export const usersActionTypes = {
    USERS_GET_PENDING: "USERS_GET_PENDING",
    USERS_GET_SUCCESS: "USERS_GET_SUCCESS",
    USERS_GET_ERROR: "USERS_GET_ERROR",
    USERS_QUERY_GET_PENDING: "USERS_QUERY_GET_PENDING",
    USERS_QUERY_GET_SUCCESS: "USERS_QUERY_GET_SUCCESS",
    USERS_QUERY_GET_ERROR: "USERS_QUERY_GET_ERROR",
    USERS_CREATE_PENDING: "USERS_CREATE_PENDING",
    USERS_CREATE_SUCCESS: "USERS_CREATE_SUCCESS",
    USERS_CREATE_ERROR: "USERS_CREATE_ERROR",
    USERS_EDIT_PENDING: "USERS_EDIT_PENDING",
    USERS_EDIT_SUCCESS: "USERS_EDIT_SUCCESS",
    USERS_EDIT_ERROR: "USERS_EDIT_ERROR",

    USERS_EDIT_GENERAL_PENDING: "USERS_EDIT_GENERAL_PENDING",
    USERS_EDIT_GENERAL_SUCCESS: "USERS_EDIT_GENERAL_SUCCESS",
    USERS_EDIT_GENERAL_ERROR: "USERS_EDIT_GENERAL_ERROR",

    USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS: "USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS",
    USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING: "USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING",
    USERS_MANAGEMENT_LOAD_INITIAL_USER_ERROR: "USERS_MANAGEMENT_LOAD_INITIAL_USER_ERROR",
    USERS_MANAGEMENT_REMOVE_ORGANIZATION: "USERS_MANAGEMENT_REMOVE_ORGANIZATION",
    USERS_MANAGEMENT_ADD_ORGANIZATION: "USERS_MANAGEMENT_ADD_ORGANIZATION",
    USERS_MANAGEMENT_SHOW_ROLE_DETAIL: "USERS_MANAGEMENT_SHOW_ROLE_DETAIL",
    USERS_MANAGEMENT_ADD_ROLE: "USERS_MANAGEMENT_ADD_ROLE",
    USERS_MANAGEMENT_REMOVE_ROLE: "USERS_MANAGEMENT_REMOVE_ROLE",
    CLEAR_USERS: "CLEAR_USERS",
    CLEAR_USER_MANAGEMENT: "CLEAR_USER_MANAGEMENT",
    RESET_USER_MANAGEMENT: "RESET_USER_MANAGEMENT"
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
        const users: User[] = (await coreApiService.userService.getUsers()).data;
        dispatch({
            type: usersActionTypes.USERS_GET_SUCCESS,
            payload: users
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

export const getUsersQuery = (query: QueryParameters) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_QUERY_GET_PENDING
    });

    try {
        const result: QueryResult = (await coreApiService.userService.getUsersQuery(query)).data;
        dispatch({
            type: usersActionTypes.USERS_QUERY_GET_SUCCESS,
            payload: result
        });
    } catch (e) {
        dispatch({
            type: usersActionTypes.USERS_QUERY_GET_ERROR,
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
        await coreApiService.userService.createUser(primaryEmailAddress, firstName, lastName, password, confirmPassword, organizationIds);
        dispatch({
            type: usersActionTypes.USERS_CREATE_SUCCESS
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
        payload: { user: null, organizations: null}
    });
};

export const loadManagementInitialUser = (userId: string) => async (dispatch: Dispatch<any>, getState: () => State) => {
    try {
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_PENDING
        });

        const userViewModel: UserViewModel = {
            user: userId != null ? (await coreApiService.userService.getUserById(userId)).data : null,
            selectedOrganizations: [],
            selectedRoles: []
        };

        userViewModel.selectedOrganizations = getState().organizations.organizations
            .filter((organization: Organization) => userViewModel.user.userRoles
                .map(userRole => userRole.role.organizationId).includes(organization.id)
            )
            .sort((a: Organization, b: Organization) => a.name.localeCompare(b.name));
    
        userViewModel.selectedRoles = getState().roles.roles
            .filter((role: Role) => userViewModel.user.userRoles
                .map(userRole => userRole.roleId).includes(role.id)
            )
            .sort((a: Role, b: Role) => a.name.localeCompare(b.name));
    
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_LOAD_INITIAL_USER_SUCCESS,
            payload: { userViewModel }
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

export const selectOrganization = (organizationId: string) => (dispatch: Dispatch<any>, getState: () => State) => {
    if (organizationId != null) {
        const organization = getState().organizations.organizations.filter(x=> x.id === organizationId)
        dispatch(change('userManagementOrganizationsForm', 'selectedOrganization', organization));
    }
}

export const selectRole = (roleId: string) => (dispatch: Dispatch<any>, getState: () => State) => {
    if (roleId != null) {
        const role = getState().roles.roles.filter(x=> x.id === roleId)
        dispatch(change('userManagementRolesForm', 'selectedOrganization', role));
    }
}

export const addOrganization = (selectedOrganization: Dropdown) => (dispatch: Dispatch<any>, getState: ()=> State) => {
    if (selectedOrganization != null) {
        const organization = getState().organizations.organizations.filter((organization: Organization) => organization.id == selectedOrganization.value)[0];
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_ADD_ORGANIZATION,
            payload: { organization }
        });
        dispatch(change('userManagementOrganizationsForm', 'selectedOrganization', null));
    }
}

export const removeOrganization = (index: number) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_REMOVE_ORGANIZATION,
        payload: { index }
    });
}

export const toggleRoleDetails = (index: number, activePanelIndex: number) => (dispatch: Dispatch<any>) => {
    if (activePanelIndex === index) {
        index = null;
    }
    dispatch(change('userManagementRolesForm', 'activeRoleDetailIndex', index));
}

export const addRole = (selectedRole: Dropdown) => (dispatch: Dispatch<any>, getState: ()=> State) => {

    if (selectedRole != null) {
        const role = getState().roles.roles.filter((role: Role) => role.id == selectedRole.value)[0];
        dispatch({
            type: usersActionTypes.USERS_MANAGEMENT_ADD_ROLE,
            payload: { role }
        });
        dispatch(change('userManagementRolesForm', 'selectedRole', null));
    }
}

export const removeRole = (index: number) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_MANAGEMENT_REMOVE_ROLE,
        payload: { index }
    });
}

export const togglePanel = (index: number) => (dispatch: Dispatch<any>) => {
    dispatch(change('userManagementForm', 'activePanelIndex', index));
}

export const cancelUserPanel = () => (dispatch: Dispatch<any>) => { 
    dispatch({
        type: usersActionTypes.RESET_USER_MANAGEMENT
    });
    dispatch(reset("userManagementGeneralForm"));
    dispatch(change('userManagementForm', 'activePanelIndex', null));
}

export const editUserGeneral = (userId: string, firstName: string, lastName: string) => async (dispatch: Dispatch<any>, getState: ()=> State) => {
    dispatch({
        type: usersActionTypes.USERS_EDIT_PENDING
    });

    try {
        await coreApiService.userService.editUserGeneral(userId, firstName, lastName);
        dispatch(change('userManagementForm', 'activePanelIndex', null));
        dispatch({
            type: usersActionTypes.USERS_EDIT_SUCCESS
        });
        loadManagementInitialUser(userId)(dispatch, getState);
    } catch (e) {
        dispatch({
            type: usersActionTypes.USERS_EDIT_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const editUserOrganizations = (userId: string) => async (dispatch: Dispatch<any>, getState: ()=> State) => {
    dispatch({
        type: usersActionTypes.USERS_EDIT_PENDING
    });

    try {
        const organizationIds = getState().userManagement.user.selectedOrganizations.map(organization => organization.id);
        await coreApiService.userService.editUserOrganizations(userId, organizationIds);
        dispatch(change('userManagementForm', 'activePanelIndex', null));
        dispatch({
            type: usersActionTypes.USERS_EDIT_SUCCESS
        });
        loadManagementInitialUser(userId)(dispatch, getState);
    } catch (e) {
        dispatch({
            type: usersActionTypes.USERS_EDIT_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const editUserRoles = (userId: string, roleIds: string[]) => async (dispatch: Dispatch<any>, getState: () => State) => {
    dispatch({
        type: usersActionTypes.USERS_EDIT_PENDING
    });

    try {
        await coreApiService.userService.editUserRoles(userId, roleIds);
        dispatch(change('userManagementForm', 'activePanelIndex', null));
        dispatch({
            type: usersActionTypes.USERS_EDIT_SUCCESS
        });
        loadManagementInitialUser(userId)(dispatch, getState);
    } catch (e) {
        dispatch({
            type: usersActionTypes.USERS_EDIT_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const deleteUser = (userId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: usersActionTypes.USERS_EDIT_PENDING
    });

    try {
        await coreApiService.userService.deleteUser(userId);
        dispatch({
            type: usersActionTypes.USERS_EDIT_SUCCESS
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
