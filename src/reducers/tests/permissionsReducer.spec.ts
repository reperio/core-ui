import {StatePermissions} from '../../store/initialState';
import {permissionsReducer} from "../../reducers/permissionsReducer";
import {permissionsActionTypes} from '../../actionTypes/permissionsActionTypes';
import { Permission } from '@reperio/core-connector';

describe("permissionsReducer", () => {
    const baseState: StatePermissions = {
        errorMessage: null,
        isError: false,
        isPending: false,
        permissions: []
    };

    const permission: Permission = {
        name: 'test',
        description: 'test description',
        displayName: 'this is a test',
        isSystemAdminPermission: false,
        lastModified: null,
        rolePermissions: []
    };

    it('should set isPending to true when called with PERMISSIONS_GET_PENDING', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_GET_PENDING, payload: null as any};
        const newState = permissionsReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...baseState,
            isPending: true
        });
    });

    it('should set permissions when called with PERMISSIONS_GET_SUCCESS', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_GET_SUCCESS, payload: [permission]};
        const newState = permissionsReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...baseState,
            permissions: [permission]
        });
    });

    it('should set isError to true when called with PERMISSIONS_GET_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_GET_ERROR, payload: {message: 'There was an error.'}};
        const newState = permissionsReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isError: true
        });
    });

    it('should set errorMessage when called with PERMISSIONS_GET_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.PERMISSIONS_GET_ERROR, payload: {message: 'There was an error.'}};
        const newState = permissionsReducer(testInitialState, action);
        expect(newState).toMatchObject({
            errorMessage: 'There was an error.'
        });
    });

    it('should set state back to base state when called with CLEAR_PERMISSIONS', () => {
        const testInitialState = baseState;
        const action = {type: permissionsActionTypes.CLEAR_PERMISSIONS, payload: null as any};
        const newState = permissionsReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...baseState
        });
    });
});