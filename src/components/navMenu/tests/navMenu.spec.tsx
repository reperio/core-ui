import * as React from 'react';
import {shallow} from 'enzyme';
import NavMenu, {HomeLink, SignupLink, LoginLink} from '../navMenu';
import User from '../../../models/user';

test('Checks to see if logged out, shows two links on the navbar: one for signup and one for login', () => {
    const wrapper = shallow(
        <NavMenu authSession={{
            isAuthInitialized: true,
            isAuthenticated: false,
            user: null,
            errorMessage: null,
            isError: null,
            isPending: false,
            otpIsPending: false,
            otpIsError: false,
            reperioCoreJWT: null
        }} />
    );

    expect(wrapper.find(SignupLink)).toHaveLength(1);
    expect(wrapper.find(LoginLink)).toHaveLength(1);
});

test('Checks to see if logged in, does not show login link and the first is home', () => {
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
        userRoles: []
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
    expect(wrapper.find(LoginLink)).toHaveLength(0);
});