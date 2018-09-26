import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { roleService } from "../services/roleService";
import {reset, change} from "redux-form";
import { permissionService } from "../services/permissionService";

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
    ROLES_MANAGEMENT_LOAD_INITIAL_ROLE: "ROLES_MANAGEMENT_LOAD_INITIAL_ROLE",
    ROLE_MANAGEMENT_REMOVE_PERMISSION_INITIAL_ROLE: "ROLE_MANAGEMENT_REMOVE_PERMISSION_INITIAL_ROLE",
    ROLES_MANAGEMENT_ADD_PERMISSION_INITIAL_ROLE: "ROLES_MANAGEMENT_ADD_PERMISSION_INITIAL_ROLE",
    ROLES_CREATE_PENDING: "ROLES_CREATE_PENDING",
    ROLES_CREATE_SUCCESS: "ROLES_CREATE_SUCCESS",
    ROLES_CREATE_ERROR: "ROLES_CREATE_ERROR",
    ROLES_MANAGEMENT_SHOW_INITIAL_ROLE_PERMISSION_DETAIL: "ROLES_MANAGEMENT_SHOW_INITIAL_ROLE_PERMISSION_DETAIL" 
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
        const roles = await roleService.getRoles();
        dispatch({
            type: rolesActionTypes.ROLES_GET_SUCCESS,
            payload: roles.data
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
        type: rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE,
        payload: { role: {data: null as any }, permissions: {data: null as any}}
    });
};

export const loadManagementInitialRole = (roleId: string) => async (dispatch: Dispatch<any>) => {
    const role = roleId != null ? await roleService.getRoleById(roleId) : null;
    const permissions = await permissionService.getPermissions();

    role.data.selectedPermissions = role.data.rolePermissions
        .map((rolePermission:any) => {
            return {
                value: rolePermission.permission.id, 
                label: rolePermission.permission.name
            }
        })
        .sort((a: any, b: any) => a.label.localeCompare(b.label));

    dispatch({
        type: rolesActionTypes.ROLES_MANAGEMENT_LOAD_INITIAL_ROLE,
        payload: { role, permissions }
    });

    dispatch(reset("roleManagement"))
};

export const removePermissionFromRole = (index: any) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLE_MANAGEMENT_REMOVE_PERMISSION_INITIAL_ROLE,
        payload: { index }
    });
}

export const selectPermission = (permission: any) => (dispatch: Dispatch<any>) => {
    dispatch(change('roleManagementForm', 'selectedPermission', permission.value ? {name: permission.label, id: permission.value} : ""));
}

export const addPermission = (permission: any) => (dispatch: Dispatch<any>) => {
    if (permission != null) {
        dispatch({
            type: rolesActionTypes.ROLES_MANAGEMENT_ADD_PERMISSION_INITIAL_ROLE,
            payload: { permission }
        });
        dispatch(change('roleManagementForm', 'selectedPermission', null));
    }
}

export const editRole = (id: string, name: string, permissionIds: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLES_SAVE_PENDING
    });

    try {
        await roleService.editRole(id, {name, permissionIds});

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

export const createRole = (name: string, application: any, organization:any, permissions: any[]) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLES_CREATE_PENDING
    });

    try {
        await roleService.createRole({name, applicationId: application ? application.value : null, organizationId: organization.value, permissionIds: permissions ? permissions.map((x:any) => x.value) : []});

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

export const deleteRole = (id: string) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: rolesActionTypes.ROLES_DELETE_PENDING
    });

    try {
        await roleService.deleteRole(id);

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