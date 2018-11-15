import React from 'react'
import {Navbar, LinkContainer, NavItem} from '@reperio/ui-components'
import { NavDropdown } from 'react-bootstrap';
import { StateAuthSession } from '../../store/initialState';

interface NavMenuProps {
    authSession: StateAuthSession;
}

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

export const SignupLink = () => (
    <LinkContainer exact to="/signup">
        <NavItem>
            Signup
        </NavItem>
    </LinkContainer>
);

export const LoginLink = () => (
    <LinkContainer to="/login">
        <NavItem>
            Login
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

const NavMenu = (props: NavMenuProps) => (
    <Navbar
        applicationName={"test"}
        authenticated={props.authSession.isAuthenticated}>

        {props.authSession.isAuthenticated ? <HomeLink /> : null}
        {props.authSession.isAuthenticated ? <UsersLink /> : null}
        {props.authSession.isAuthenticated ? <RolesLink /> : null}
        {!props.authSession.isAuthenticated ? <SignupLink /> : null}
        {!props.authSession.isAuthenticated ? <LoginLink /> : null}
        {props.authSession.isAuthenticated ? <AdminDropdown /> : null}
    </Navbar>
);

export default NavMenu;