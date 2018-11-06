import * as React from 'react';
import { mount } from 'enzyme';
import NavMenu from '../navMenu';
import { LinkContainer } from '@reperio/ui-components';
import { MemoryRouter } from 'react-router';
import User from '../../../models/user';

test('Checks to see if logged out, shows two links on the navbar: ideally one for signup and one for login', () => {
  const wrapper = mount(
    <MemoryRouter>
      <NavMenu authSession={
        {
          isAuthenticated: false,
          user: null, 
          errorMessage: null, 
          isError: null, 
          isPending: false
        }
      } />
    </MemoryRouter>);

  expect(wrapper.find(LinkContainer)).toHaveLength(2);
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
  }
  const wrapper = mount(
    <MemoryRouter>
      <NavMenu authSession={
        {
          isAuthenticated: true,
          user,
          errorMessage: null, 
          isError: null, 
          isPending: false
        }
      } />
    </MemoryRouter>);

  expect(wrapper.find(LinkContainer).first().text().trim()).toEqual('Home');
});