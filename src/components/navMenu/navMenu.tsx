import React from 'react'
import {Navbar, LinkContainer, NavItem} from '@reperio/ui-components'
import { NavDropdown } from 'react-bootstrap';

export const HomeLink = () => (
    <LinkContainer exact to="/home">
        <NavItem>
            Home
        </NavItem>
    </LinkContainer>
);

export const UsersLink = () => (
    <LinkContainer exact to="/users">
        <NavItem>
            Users
        </NavItem>
    </LinkContainer>
);

export const RolesLink = () => (
    <LinkContainer exact to="/roles">
        <NavItem>
            Roles
        </NavItem>
    </LinkContainer>
);

export const PermissionsLink = () => (
    <LinkContainer exact to="/permissions">
        <NavItem>
            Permissions
        </NavItem>
    </LinkContainer>
);

export const OrganizationsLink = () => (
    <LinkContainer exact to="/organizations">
        <NavItem>
            Organizations
        </NavItem>
    </LinkContainer>
);

export const AdminDropdown = () => (
    <NavDropdown pullRight title="Administration" id="admin-dropdown">
        <PermissionsLink />
        <OrganizationsLink />
    </NavDropdown>
);

const NavMenu = () => (
    <Navbar
        applicationName={"test"}
        authenticated={true}>

        <HomeLink />
        <UsersLink />
        <RolesLink />
        <AdminDropdown />
    </Navbar>
);

export default NavMenu;