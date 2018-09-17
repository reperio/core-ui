import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { permissionService } from "../services/permissionService";
import {reset} from "redux-form";

export const permissionsActionTypes = {
    PERMISSIONS_GET_PENDING: "PERMISSIONS_GET_PENDING",
    PERMISSIONS_GET_SUCCESS: "PERMISSIONS_GET_SUCCESS",
    PERMISSIONS_GET_ERROR: "PERMISSIONS_GET_ERROR",
    PERMISSIONS_SAVE_PENDING: "PERMISSIONS_SAVE_PENDING",
    PERMISSIONS_SAVE_SUCCESS: "PERMISSIONS_SAVE_SUCCESS",
    PERMISSIONS_SAVE_ERROR: "PERMISSIONS_SAVE_ERROR",
    PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION: "PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION"
};

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
        const permissions = await permissionService.getPermissions();
        dispatch({
            type: permissionsActionTypes.PERMISSIONS_GET_SUCCESS,
            payload: permissions.data
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

export const clearManagementInitialPermission = () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION,
        payload: { permission: {data: null as any }}
    });
};

export const loadManagementInitialPermission = (permissionId: string) => async (dispatch: Dispatch<any>) => {
    const permission = permissionId != null ? await permissionService.getPermissionById(permissionId) : null;

    dispatch({
        type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION,
        payload: { permission }
    });

    dispatch(reset("permissionManagement"))
};

export const editPermission = (id: string, displayName: string, name: string, description: string, isSystemAdminPermission:boolean) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: permissionsActionTypes.PERMISSIONS_SAVE_PENDING
    });

    try {
        await permissionService.editPermission(id, {description, displayName, isSystemAdminPermission, name});
        
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
