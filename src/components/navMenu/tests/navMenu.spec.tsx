import * as React from 'react';
import {shallow} from 'enzyme';
import NavMenu, {HomeLink} from '../navMenu';
import { User } from '@reperio/core-connector';

test('Checks to see if the first is home', () => {
    const user: User = {
        firstName: 'test',
        id: 'dka9ef76-7c4a-sdft-s647-85hhhha752f4',
        lastName: 'user',
        password: null,
        primaryEmailAddress: 'test@test.com',
        userEmails: [],
        userOrganizations: [],
        userRoles: [],
        permissions: [],
        userPhones: []
    };
    const wrapper = shallow(
        <NavMenu authSession={{
            isAuthInitialized: true,
            isAuthenticated: true,
            redirectToLogin: false,
            user,
            errorMessage: null,
            isError: null,
            isPending: false,
            otpIsPending: false,
            otpIsError: false
        }} />
    );

    expect(wrapper.find(HomeLink)).toHaveLength(1);
});