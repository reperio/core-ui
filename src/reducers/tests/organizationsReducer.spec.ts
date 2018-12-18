import { StateOrganizations} from '../../store/initialState';
import { organizationsReducer } from "../../reducers/organizationsReducer";
import { organizationsActionTypes } from '../../actionTypes/organizationActionTypes';
import { Organization } from '@reperio/core-connector';

 describe("organizationsReducer", () => {
    const organization: Organization = {
        name: 'test',
        id: '',
        personal: false,
        userOrganizations: []
    };

     const baseState: StateOrganizations = {
        errorMessage: null,
        isError: false,
        isPending: false,
        organizations: []
    };

    it('should set isPending to true when called with ORGANIZATIONS_GET_PENDING', () => {
        const testInitialState = baseState;
        const action = {type: organizationsActionTypes.ORGANIZATIONS_GET_PENDING, payload: null as any};
        const newState = organizationsReducer(baseState, action);
        expect(newState).toMatchObject({
            isPending: true
        });
    });
    it('should set organizations when called with ORGANIZATIONS_GET_SUCCESS', () => {
        const testInitialState = baseState;
        const action = {type: organizationsActionTypes.ORGANIZATIONS_GET_SUCCESS, payload: [organization]};
        const newState = organizationsReducer(testInitialState, action);
        expect(newState).toMatchObject({
            organizations: [organization]
        });
    });
    it('should set isError to true when called with ORGANIZATIONS_GET_ERROR', () => {
        const testInitialState = baseState;
        const action = {type: organizationsActionTypes.ORGANIZATIONS_GET_ERROR, payload: {message: 'There was an error.'}};
        const newState = organizationsReducer(testInitialState, action);
        expect(newState).toMatchObject({
            isError: true
        });
    });
     it('should set state back to base state when called with CLEAR_ORGANIZATIONS', () => {
        const testInitialState = baseState;
        const action = {type: organizationsActionTypes.CLEAR_ORGANIZATIONS, payload: null as any};
        const newState = organizationsReducer(testInitialState, action);
        expect(newState).toMatchObject({
            ...baseState
        });
    });
}); 