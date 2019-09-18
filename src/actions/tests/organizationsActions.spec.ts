import {organizationsActionTypes} from '../../actionTypes/organizationActionTypes';
import { AxiosError } from 'axios';
import { Organization } from '@reperio/core-connector';
import { reset, change } from 'redux-form';
import { State } from '../../store/initialState';
import { OrganizationViewModel } from '../../models/organizationViewModel';
import Dropdown from '../../models/dropdown';

const organizations: Organization[] = [{
    id: '123',
    name: 'test',
    personal: false,
    userOrganizations: [],
    organizationAddress: [],
    supportNumber: '513-123-4567'
}];

const mockCoreApiService = {
    coreApiService: {
        organizationService: {
            getOrganizations() {
                return {data: organizations}
            },
            getOrganizationById(orgId: string) {
                if (orgId) {
                    return {data: organizations[0]}
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
            editOrganization(organizationId: string, name: string, userIds: string[]) {
                if (organizationId && name && userIds && userIds.length >= 0) {
                    return;
                }
                else {
                    const error: AxiosError = {
                        config: null,
                        name: null,
                        message: null,
                        response: {
                            data: null,
                            status: 400,
                            statusText: null,
                            headers: null,
                            config: null
                        }
                    };
                    throw error;
                }
            },
            createOrganization(name: string, userIds: string[]) {
                if (name && userIds && userIds.length >= 0) {
                    return;
                }
                else {
                    const error: AxiosError = {
                        config: null,
                        name: null,
                        message: null,
                        response: {
                            data: null,
                            status: 400,
                            statusText: null,
                            headers: null,
                            config: null
                        }
                    };
                    throw error;
                }
            },
            deleteOrganization(organizationId: string) {
                if (organizationId) {
                    return;
                }
                else {
                    const error: AxiosError = {
                        config: null,
                        name: null,
                        message: null,
                        response: {
                            data: null,
                            status: 400,
                            statusText: null,
                            headers: null,
                            config: null
                        }
                    };
                    throw error;
                }
            }
        }
    }
};

jest.mock("../../services/coreApiService", () => mockCoreApiService);

import * as organizationsActions from "../../actions/organizationsActions";

describe("organizations actions", () => {
    const baseState: State = {
        authSession: {
            isAuthInitialized: false,
            isPending: false,
            redirectToLogin: false,
            isAuthenticated: false,
            isError: false,
            otpIsPending: false,
            otpIsError: false,
            errorMessage: null,
            user: null
        },
        users: {
            isPending: false,
            isError: false,
            errorMessage: null,
            users: []
        },
        userManagement: {
            isPending: false,
            isError: false,
            errorMessage: null,
            initialUser: null,
            user: null
        },
        permissions: {
            isPending: false,
            isError: false,
            errorMessage: null,
            permissions: []
        },
        permissionManagement: {
            isPending: false,
            isError: false,
            errorMessage: null,
            initialPermission: null
        },
        roles: {
            isPending: false,
            isError: false,
            errorMessage: null,
            roles: []
        },
        roleManagement: {
            isPending: false,
            isError: false,
            errorMessage: null,
            initialRole: null
        },
        organizations: {
            isPending: false,
            isError: false,
            errorMessage: null,
            organizations: []
        },
        organizationManagement: {
            isPending: false,
            isError: false,
            errorMessage: null,
            initialOrganization: null
        },
        applications: {
            isPending: false,
            isError: false,
            errorMessage: null,
            applications: []
        },
        queryResult: {
            data: [],
            pages: 0
        }
    };

    it("should dispatch correct actions when getting organizations", async () => {
        const dispatchMock = jest.fn();
        await organizationsActions.getOrganizations()(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: organizationsActionTypes.ORGANIZATIONS_GET_PENDING
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: organizationsActionTypes.ORGANIZATIONS_GET_SUCCESS,
            payload: organizations
        });
    });

    it("should dispatch correct actions when getting organization by id", async () => {
        const dispatchMock = jest.fn();

        const state = {
            ...baseState
        };

        const getStateMock = jest.fn(() => state);
        await organizationsActions.loadManagementInitialOrganization('123')(dispatchMock, getStateMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_PENDING
        });

        const organizationViewModel: OrganizationViewModel = {
            organization: organizations[0],
            selectedUsers: []
        };

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_SUCCESS,
            payload: {organizationViewModel}
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(3, 
            reset('organizationManagement')
        );
    });

    it("should dispatch correct action when removeUserFromOrganization is called", async () => {
        const dispatchMock = jest.fn();
        await organizationsActions.removeUserFromOrganization('123')(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: organizationsActionTypes.ORGANIZATION_MANAGEMENT_REMOVE_USER_INITIAL_ORGANIZATION,
            payload: {userId: '123'}
        });
    });

    it("should dispatch correct action when selectUser is called", async () => {
        const dispatchMock = jest.fn();
        const user: Dropdown = {
            label: 'test',
            value: '1234'
        };
        await organizationsActions.selectUser(user)(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, 
            change('organizationManagementForm', 'selectedUser', user.value ? { name: user.label, id: user.value } : "")
        );
    });

    it("should dispatch correct action when addUser is called", async () => {
        const dispatchMock = jest.fn();
        const user: Dropdown = {
            label: 'test',
            value: '1234'
        };

        const state: State = {
            ...baseState,
            users: {
                ...baseState.users,
                users: [{
                    firstName: 'test',
                    id: '1234',
                    lastName: 'test2',
                    password: null,
                    permissions: [],
                    primaryEmailAddress: 'test@test.com',
                    userEmails: [],
                    userOrganizations: [],
                    userRoles: [],
                    userPhones: []
                }]
            }
        };

        const getStateMock = jest.fn(() => state);

        await organizationsActions.addUser(user)(dispatchMock, getStateMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_ADD_USER_INITIAL_ORGANIZATION,
            payload: {user: state.users.users[0]}
        });
    });

    it("should dispatch correct action when editOrganization is called", async () => {
        const dispatchMock = jest.fn();
        await organizationsActions.editOrganization('1234', 'this is just a test', [])(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: organizationsActionTypes.ORGANIZATIONS_SAVE_PENDING
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: organizationsActionTypes.ORGANIZATIONS_SAVE_SUCCESS
        });
    });

    it("should dispatch correct action when createOrganization is called", async () => {
        const dispatchMock = jest.fn();
        await organizationsActions.createOrganization('this is a test', [])(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: organizationsActionTypes.ORGANIZATIONS_CREATE_PENDING
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: organizationsActionTypes.ORGANIZATIONS_CREATE_SUCCESS
        });
    });

    it("should dispatch correct action when editOrganization is called", async () => {
        const dispatchMock = jest.fn();
        await organizationsActions.editOrganization('1234', 'this is just a test', [])(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: organizationsActionTypes.ORGANIZATIONS_SAVE_PENDING
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: organizationsActionTypes.ORGANIZATIONS_SAVE_SUCCESS
        });
    });

    it("should dispatch correct action when deleteOrganization is called", async () => {
        const dispatchMock = jest.fn();
        await organizationsActions.deleteOrganization('1234')(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: organizationsActionTypes.ORGANIZATIONS_DELETE_PENDING
        });

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: organizationsActionTypes.ORGANIZATIONS_DELETE_SUCCESS
        });
    });
});