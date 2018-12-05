import {permissionsActionTypes} from '../../actionTypes/permissionsActionTypes';
import { AxiosError } from 'axios';
import { Permission, RolePermission } from '@reperio/core-connector';

const permissions: Permission[] = [{
    description: 'test description',
    displayName: 'this is a test',
    isSystemAdminPermission: false,
    lastModified: null,
    name: 'test',
    rolePermissions: [
        {
            permission: null,
            permissionName: 'test',
            role: null,
            roleId: ''
        }
    ]
}];

const mockCoreApiService = {
    coreApiService: {
        permissionService: {
            getPermissions() {
                return {data: permissions}
            },
            getPermissionById(permissionName: string) {
                if (permissionName === 'test') {
                    return {data: permissions[0]}
                }
                else {
                    const error: AxiosError = {
                        config: null,
                        name: null,
                        message: null,
                        response: {
                            data: null,
                            status: 500,
                            statusText: null,
                            headers: null,
                            config: null
                        }
                    };
                    throw error;
                }
            },
            removePermissionFromRole: jest.fn(),
            editPermission(permissionName: string, displayName: string, description: string, isSystemAdminPermission: boolean, rolePermissions: RolePermission[]) {
                return;
            }
        }
    }
};

jest.mock("../../services/coreApiService", () => mockCoreApiService);

import * as permissionsActions from "../../actions/permissionsActions";
import { reset } from 'redux-form';

describe("permission actions", () => {
    it("should dispatch correct actions when getting permissions", async () => {
        const dispatchMock = jest.fn();
        await permissionsActions.getPermissions()(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: permissionsActionTypes.PERMISSIONS_GET_PENDING
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: permissionsActionTypes.PERMISSIONS_GET_SUCCESS,
            payload: permissions
        });
    });

    it("should dispatch correct actions when getting permission by id", async () => {
        const dispatchMock = jest.fn();
        await permissionsActions.loadManagementInitialPermission('test')(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_PENDING
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_SUCCESS,
            payload: {permission: permissions[0]}
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(3, 
            reset('permissionManagement')
        );
    });

    it("should dispatch correct action when removingPermissionFromRole is called", async () => {
        const dispatchMock = jest.fn();
        await permissionsActions.removePermissionFromRole(0)(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: permissionsActionTypes.PERMISSION_MANAGEMENT_REMOVE_ROLE_INITIAL_PERMISSION,
            payload: {index: 0}
        });
    });

    it("should dispatch correct action when editingPermission is called", async () => {
        const dispatchMock = jest.fn();
        await permissionsActions.editPermission('test', 'this is a test', 'this is just a test', false, [])(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: permissionsActionTypes.PERMISSIONS_SAVE_PENDING
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: permissionsActionTypes.PERMISSIONS_SAVE_SUCCESS
        });
    });

    it("should dispatch correct action when clearManagementInitialPermission is called", async () => {
        const dispatchMock = jest.fn();
        await permissionsActions.clearManagementInitialPermission()(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_PENDING
        });
    });
});