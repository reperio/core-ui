import * as React from 'react';
import {shallow} from 'enzyme';
import NavMenu, {AdminDropdown, HomeLink, OrganizationsLink, PermissionsLink, RolesLink, UsersLink} from '../navMenu';


test('Navbar shows correct items in the correct order', () => {
    const wrapper = shallow(
        <NavMenu />
    );

    expect(wrapper.children()).toHaveLength(4);
    expect(wrapper.childAt(0).type()).toBe(HomeLink);
    expect(wrapper.childAt(1).type()).toBe(UsersLink);
    expect(wrapper.childAt(2).type()).toBe(RolesLink);
    expect(wrapper.childAt(3).type()).toBe(AdminDropdown);
});

test('AdminDropdown shows correct items in the correct order', () => {
    const wrapper = shallow(
        <AdminDropdown />
    );

    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper.childAt(0).type()).toBe(PermissionsLink);
    expect(wrapper.childAt(1).type()).toBe(OrganizationsLink);
});