import * as React from 'react';
import {shallow} from 'enzyme';
import NavMenu, {HomeLink} from '../navMenu';
import User from '../../../models/user';

test('Checks to see if the first is home', () => {
    const user: User = {
        firstName: 'test',
        id: 'dka9ef76-7c4a-sdft-s647-85hhhha752f4',
        lastName: 'user',
        password: null,
        primaryEmailAddress: 'test@test.com',
        selectedOrganizations: [],
        selectedRoles: [],
        userEmails: [],
        userOrganizations: [],
        userRoles: [],
        permissions: []
    };
    const wrapper = shallow(
        <NavMenu authSession={{
            isAuthInitialized: true,
            isAuthenticated: true,
            user,
            errorMessage: null,
            isError: null,
            isPending: false,
            otpIsPending: false,
            otpIsError: false,
            reperioCoreJWT: null
        }} />
    );

    expect(wrapper.find(HomeLink)).toHaveLength(1);
});