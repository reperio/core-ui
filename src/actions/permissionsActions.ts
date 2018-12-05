import {Dispatch} from "react-redux";
import { history } from '../store/history';
import {reset} from "redux-form";
import { Permission, RolePermission } from "@reperio/core-connector";
import { coreApiService } from "../services/coreApiService";
import {permissionsActionTypes} from '../actionTypes/permissionsActionTypes';

function getErrorMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
        case 400:
        case 401:
        case 403:
        default:
            return "An error occurred, please contact your system administrator"}
}

export const getPermissions = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: permissionsActionTypes.PERMISSIONS_GET_PENDING,
        payload: {}
    });

    try {
        const permissions: Permission[] = (await coreApiService.permissionService.getPermissions()).data;
        dispatch({
            type: permissionsActionTypes.PERMISSIONS_GET_SUCCESS,
            payload: permissions
        });
    } catch (e) {
        dispatch({
            type: permissionsActionTypes.PERMISSIONS_GET_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const loadManagementInitialPermission = (permissionName: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_PENDING
        });

        const permission: Permission = permissionName != null ? (await coreApiService.permissionService.getPermissionById(permissionName)).data : null;

        dispatch({
            type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_SUCCESS,
            payload: { permission }
        });
    
        dispatch(reset("permissionManagement"))
    }
    catch (e) {
        dispatch({
            type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const removePermissionFromRole = (index: number) => (dispatch: Dispatch<any>) => {
    dispatch({
        type: permissionsActionTypes.PERMISSION_MANAGEMENT_REMOVE_ROLE_INITIAL_PERMISSION,
        payload: { index }
    });
}

export const editPermission = (permissionName: string, displayName: string, description: string, isSystemAdminPermission: boolean, rolePermissions: RolePermission[]) => async (dispatch: Dispatch<any>) => {

    dispatch({
        type: permissionsActionTypes.PERMISSIONS_SAVE_PENDING
    });

    const rp = rolePermissions
        .map((rolePermission: RolePermission) => {
            return {
                roleId: rolePermission.roleId,
                permissionName: rolePermission.permissionName
            }
        });

    try {
        await coreApiService.permissionService.editPermission(permissionName, displayName, description, isSystemAdminPermission, rolePermissions);

        dispatch({
            type: permissionsActionTypes.PERMISSIONS_SAVE_SUCCESS
        });
        history.push('/permissions');
    } catch (e) {
        dispatch({
            type: permissionsActionTypes.PERMISSIONS_SAVE_ERROR,
            payload: {
                message: getErrorMessageFromStatusCode(e.response != null ? e.response.status : null)
            }
        });
    }
};

export const clearManagementInitialPermission = () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_PENDING
    });
};