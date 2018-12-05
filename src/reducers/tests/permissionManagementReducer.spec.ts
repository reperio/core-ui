import {StatePermissionManagement, initialState} from '../../store/initialState';
import {permissionManagementReducer} from "../../reducers/permissionManagementReducer";
import {permissionsActionTypes} from '../../actionTypes/permissionsActionTypes';
import { Permission } from '@reperio/core-connector';

describe("permissionManagementReducer", () => {
    const permission: Permission = {
        name: 'test',
        description: 'test description',
        displayName: 'this is a test',
        isSystemAdminPermission: false,
        lastModified: null,
        rolePermissions: [
            {
                permission: null,
                permissionName: 'test permission name',
                role: null,
                roleId: ''
            },
            {
                permission: null,
                permissionName: 'test permission name 2',
                role: null,
                roleId: ''
            }
        ]
    };

    const baseState: StatePermissionManagement = {
        errorMessage: null,
        isError: false,
        isPending: false,
        initialPermission: null
    };

    const initializedState: StatePermissionManagement = {
        errorMessage: null,
        isError: false,
        isPending: false,
        initialPermission: permission
    };

    it('should set isPending to true when called with PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_PENDING', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_PENDING, payload: null as any};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isPending: true
        });
    });

    it('should set permissions when called with PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_SUCCESS', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_SUCCESS, payload: {permission}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            initialPermission: permission
        });
    });

    it('should set isError to true when called with PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_ERROR, payload: {message: 'There was an error.'}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isError: true
        });
    });

    it('should set errorMessage when called with PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_MANAGEMENT_LOAD_INITIAL_PERMISSION_ERROR, payload: {message: 'There was an error.'}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            errorMessage: 'There was an error.'
        });
    });

    it('should set state back to base state when called with CLEAR_PERMISSION_MANAGEMENT', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.CLEAR_PERMISSION_MANAGEMENT, payload: null as any};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...baseState
        });
    });

    it('should set isPending to true when called with PERMISSIONS_SAVE_PENDING', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_SAVE_PENDING, payload: null as any};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...baseState,
            isPending: true
        });
    });

    it('should set isError to true when called with PERMISSIONS_SAVE_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_SAVE_ERROR, payload: {message: 'There was an error.'}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isError: true
        });
    });

    it('should set isPending to false when called with PERMISSIONS_SAVE_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_SAVE_ERROR, payload: {message: 'There was an error.'}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isPending: false
        });
    });

    it('should set initialPermission to null when called with PERMISSIONS_SAVE_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_SAVE_ERROR, payload: {message: 'There was an error.'}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            initialPermission: null
        });
    });

    it('should set errorMessage when called with PERMISSIONS_SAVE_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_SAVE_ERROR, payload: {message: 'There was an error.'}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            errorMessage: 'There was an error.'
        });
    });

    it('should set initialPermission to null when called with PERMISSIONS_SAVE_SUCCESS', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_SAVE_SUCCESS, payload: {message: 'There was an error.'}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            initialPermission: null
        });
    });

    it('should set isPending to false when called with PERMISSIONS_SAVE_SUCCESS', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_SAVE_SUCCESS, payload: {message: 'There was an error.'}};
        const newState = permissionManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isPending: false
        });
    });

    it('should removed the 0 index of the rolePermissions array called with PERMISSION_MANAGEMENT_REMOVE_ROLE_INITIAL_PERMISSION', () => {
        const testInitialState = initializedState;
        const action = {type: permissionsActionTypes.PERMISSION_MANAGEMENT_REMOVE_ROLE_INITIAL_PERMISSION, payload: {index: 0}};
        const newState = permissionManagementReducer(testInitialState, action);
        let modifiedPermission = permission;
        modifiedPermission.rolePermissions = [
            {
                permission: null,
                permissionName: 'test permission name 2',
                role: null,
                roleId: ''
            }
        ];
        expect(newState).toMatchObject({
            initialPermission: modifiedPermission
        });
    });
});