import {Dispatch} from "react-redux";
import { history } from '../store/history';
import {reset, change} from "redux-form";
import Dropdown from "../models/dropdown";
import { Role, Permission } from "@reperio/core-connector";
import { RoleViewModel } from "../models/roleViewModel";
import { State } from "../store/initialState";
import { coreApiService } from "../services/coreApiService";

export const rolesActionTypes = {
    ROLES_GET_PENDING: "ROLES_GET_PENDING",
    ROLES_GET_SUCCESS: "ROLES_GET_SUCCESS",
    ROLES_GET_ERROR: "ROLES_GET_ERROR",
    ROLES_SAVE_PENDING: "ROLES_SAVE_PENDING",
    ROLES_SAVE_SUCCESS: "ROLES_SAVE_SUCCESS",
    ROLES_SAVE_ERROR: "ROLES_SAVE_ERROR",
    ROLES_DELETE_PENDING: "ROLES_DELETE_PENDING",
    ROLES_DELETE_SUCCESS: "ROLES_DELETE_SUCCESS",
    ROLES_DELETE_ERROR: "ROLES_DELETE_ERROR",
    ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_SUCCESS: "ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_SUCCESS",
    ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_PENDING: "ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_PENDING",
    ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_ERROR: "ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_ERROR",
    ROLE_MANAGEMENT_REMOVE_PERMISSION_INITIAL_ROLE: "ROLE_MANAGEMENT_REMOVE_PERMISSION_INITIAL_ROLE",
    ROLES_MANAGEMENT_ADD_PERMISSION_INITIAL_ROLE: "ROLES_MANAGEMENT_ADD_PERMISSION_INITIAL_ROLE",
    ROLES_CREATE_PENDING: "ROLES_CREATE_PENDING",
    ROLES_CREATE_SUCCESS: "ROLES_CREATE_SUCCESS",
    ROLES_CREATE_ERROR: "ROLES_CREATE_ERROR",
    ROLES_MANAGEMENT_SHOW_INITIAL_ROLE_PERMISSION_DETAIL: "ROLES_MANAGEMENT_SHOW_INITIAL_ROLE_PERMISSION_DETAIL",
    CLEAR_ROLES: "CLEAR_ROLES",
    CLEAR_ROLE_MANAGEMENT: "CLEAR_ROLE_MANAGEMENT"
};

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        case 400:
        case 401:
        case 403:
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getRoles = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLES_GET_PENDING,
        payload: {}
    });

    try {
        const roles: Role[] = (await coreApiService.roleService.getRoles()).data;
        dispatch({
            type: rolesActionTypes.ROLES_GET_SUCCESS,
            payload: roles
        });
    } catch (e) {
        dispatch({
            type: rolesActionTypes.ROLES_GET_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const clearManagementInitialRole = () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_PENDING
    });
};

export const loadManagementInitialRole = (roleId: string) => async (dispatch: Dispatch<any>, getState: () => State) => {
    try {
        dispatch({
            type: rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_PENDING
        });

        const roleViewModel: RoleViewModel = {
            role: roleId != null ? (await coreApiService.roleService.getRoleById(roleId)).data : null,
            selectedPermissions: []
        };

        roleViewModel.selectedPermissions = getState().permissions.permissions
            .filter(x=> roleViewModel.role.rolePermissions
                .map(x=> x.permissionName).includes(x.name))
            .sort((a: Permission, b: Permission) => a.displayName.localeCompare(b.displayName));
    
        dispatch({
            type: rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_SUCCESS,
            payload: { roleViewModel }
        });
    
        dispatch(reset("roleManagement"))
    } catch (e) {
        dispatch({
            type: rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const removePermissionFromRole = (index: number) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLE_MANAGEMENT_REMOVE_PERMISSION_INITIAL_ROLE,
        payload: { index }
    });
}

export const selectPermission = (permission: Dropdown) => (dispatch: Dispatch<any>) => {
    dispatch(change('roleManagementForm', 'selectedPermission', permission.value ? {name: permission.label, id: permission.value} : ""));
}

export const addPermission = (selectedPermission: Dropdown) => (dispatch: Dispatch<any>, getState: ()=> State) => {
    if (selectedPermission != null) {
        const test = getState().permissions.permissions;
        const permission = test.filter((permission: Permission) => permission.name == selectedPermission.value)[0];
        dispatch({
            type: rolesActionTypes.ROLES_MANAGEMENT_ADD_PERMISSION_INITIAL_ROLE,
            payload: { permission }
        });
        dispatch(change('roleManagementForm', 'selectedPermission', null));
    }
}

export const editRole = (roleId: string, name: string, permissions: string[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLES_SAVE_PENDING
    });

    try {
        await coreApiService.roleService.editRole(roleId, name, permissions);

        dispatch({
            type: rolesActionTypes.ROLES_SAVE_SUCCESS
        });
        history.push('/roles');
    } catch (e) {
        dispatch({
            type: rolesActionTypes.ROLES_SAVE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const createRole = (name: string, applicationId: string, organizationId: string, permissions: string[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLES_CREATE_PENDING
    });

    try {
        await coreApiService.roleService.createRole(name, applicationId, organizationId, permissions);

        dispatch({
            type: rolesActionTypes.ROLES_CREATE_SUCCESS
        });

        history.push('/roles');
    } catch (e) {
        dispatch({
            type: rolesActionTypes.ROLES_CREATE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const deleteRole = (roleId: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLES_DELETE_PENDING
    });

    try {
        await coreApiService.roleService.deleteRole(roleId);

        dispatch({
            type: rolesActionTypes.ROLES_DELETE_SUCCESS
        });
        history.push('/roles');
    } catch (e) {
        dispatch({
            type: rolesActionTypes.ROLES_DELETE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};