import {Dispatch} from "react-redux";
import { history } from '../store/history';
import { permissionService } from "../services/permissionService";
import {change, reset} from "redux-form";
import {authActionTypes} from "./authActions";
import {push} from "react-router-redux";

export const permissionsActionTypes = {
    PERMISSIONS_GET_PENDING: "PERMISSIONS_GET_PENDING",
    PERMISSIONS_GET_SUCCESS: "PERMISSIONS_GET_SUCCESS",
    PERMISSIONS_GET_ERROR: "PERMISSIONS_GET_ERROR",
    PERMISSIONS_SAVE_PENDING: "PERMISSIONS_SAVE_PENDING",
    PERMISSIONS_SAVE_SUCCESS: "PERMISSIONS_SAVE_SUCCESS",
    PERMISSIONS_SAVE_ERROR: "PERMISSIONS_SAVE_ERROR",
    PERMISSIONS_EDITOR_LOAD_INITIAL_PERMISSION: "PERMISSIONS_EDITOR_LOAD_INITIAL_PERMISSION"
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

export const clearEditorInitialPermission = () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: permissionsActionTypes.PERMISSIONS_EDITOR_LOAD_INITIAL_PERMISSION,
        payload: { permission: null as any }
    });
};

export const loadEditorInitialPermission = (permissionId: string) => async (dispatch: Dispatch<any>) => {
    const permission = permissionId != null ? await permissionService.getPermissionById(permissionId) : {};

    dispatch({
        type: permissionsActionTypes.PERMISSIONS_EDITOR_LOAD_INITIAL_PERMISSION,
        payload: { permission }
    });

    dispatch(reset("permissionEditor"))
};

export const cancelSavePermission = () => async (dispatch: Dispatch<any>) => {
    dispatch(push("/permissions"));
};

export const savePermission = (permission: any) => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: permissionsActionTypes.PERMISSIONS_SAVE_PENDING,
        payload: {}
    });

    try {
        if(permission.id == null){
            await permissionService.createPermission({name: permission.name, description: permission.description});
        }
        else{
            // TODO: Add update service method
        }
        
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