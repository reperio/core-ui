import { StateOrganizationManagement} from '../../store/initialState';
import { organizationManagementReducer } from "../../reducers/organizationManagementReducer";
import { organizationsActionTypes } from '../../actionTypes/organizationActionTypes';
import { OrganizationViewModel } from '../../models/organizationViewModel';

const organizationViewModel: OrganizationViewModel = {
    organization: {
        name: 'test',
        id: '',
        personal: false,
        userOrganizations: []
    },
    selectedUsers: [
        {
            firstName: 'test',
            id: '1234',
            lastName: 'test2',
            password: null,
            permissions: [],
            primaryEmailAddress: 'test@test.com',
            userEmails: [],
            userOrganizations: [],
            userRoles: []
        }
    ]
};

const baseState: StateOrganizationManagement = {
    errorMessage: null,
    isError: false,
    isPending: false,
    initialOrganization: null
};

const initializedState: StateOrganizationManagement = {
    errorMessage: null,
    isError: false,
    isPending: false,
    initialOrganization: organizationViewModel
};

 describe("organizationManagementReducer", () => {
    it('should set isPending to true when called with ORGANIZATIONS_GET_PENDING', () => {
        const action = {type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_PENDING, payload: null as any};
        const newState = organizationManagementReducer(baseState, action);
        expect(newState).toMatchObject({
            isPending: true
        });
    });
    it('should set organizations when called with ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_SUCCESS', () => {
        const testInitialState = baseState;
        const action = {type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_SUCCESS, payload: {organizationViewModel}};
        const newState = organizationManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            initialOrganization: organizationViewModel
        });
    });
    it('should set isError to true when called with ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_LOAD_INITIAL_ORGANIZATION_ERROR, payload: {message: 'There was an error.'}};
        const newState = organizationManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isError: true
        });
    });
    it('should set state back to base state when called with CLEAR_ORGANIZATION_MANAGEMENT', () => {
        const testInitialState = baseState;
        const action = {type: organizationsActionTypes.CLEAR_ORGANIZATION_MANAGEMENT, payload: null as any};
        const newState = organizationManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...baseState
        });
    });

    it('should should add a user to the organization with ORGANIZATIONS_MANAGEMENT_ADD_USER_INITIAL_ORGANIZATION', () => {
        const testInitialState = initializedState;
        const testAfterState: StateOrganizationManagement = {
            ...initializedState,
            initialOrganization: Object.assign({}, initializedState.initialOrganization, {
                selectedUsers: testInitialState.initialOrganization.selectedUsers.concat((organizationViewModel.selectedUsers))
            })
        }
        
        const action = {type: organizationsActionTypes.ORGANIZATIONS_MANAGEMENT_ADD_USER_INITIAL_ORGANIZATION, payload: {user: organizationViewModel.selectedUsers[0]}};
        const newState = organizationManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...testAfterState
        });
    });

    it('should remove a user from the organization with ORGANIZATION_MANAGEMENT_REMOVE_USER_INITIAL_ORGANIZATION', () => {
        const index = 0;
        const testInitialState = initializedState;
        const testAfterState: StateOrganizationManagement = {
            ...initializedState,
            initialOrganization: Object.assign({}, initializedState.initialOrganization, {
                selectedUsers: testInitialState.initialOrganization.selectedUsers.filter((x, i) => i == index)
            })
        }

        const action = {type: organizationsActionTypes.ORGANIZATION_MANAGEMENT_REMOVE_USER_INITIAL_ORGANIZATION, payload: {index}};
        const newState = organizationManagementReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...testAfterState
        });
    });
});