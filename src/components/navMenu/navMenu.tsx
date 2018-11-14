import React from 'react'
import {Navbar, LinkContainer, NavItem} from '@reperio/ui-components'
import { NavDropdown } from 'react-bootstrap';

import { StateAuthSession } from '../../store/initialState';
import { CorePermissions } from '../../models/permission';

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

const NavMenu = (props: NavMenuProps) => (
    <Navbar
        applicationName={"test"}
        authenticated={true}>

        <HomeLink />
        {props.authSession.user.permissions.includes(CorePermissions.ViewUsers) ? <UsersLink /> : null}
        {props.authSession.user.permissions.includes(CorePermissions.ViewRoles) ? <RolesLink /> : null}
        {props.authSession.user.permissions.includes(CorePermissions.ViewPermissions) || props.authSession.user.permissions.includes(CorePermissions.ViewOrganizations) ?
            <NavDropdown pullRight title="Administration" id="admin-dropdown">
                {props.authSession.user.permissions.includes(CorePermissions.ViewPermissions) ? <PermissionsLink /> : null}
                {props.authSession.user.permissions.includes(CorePermissions.ViewOrganizations) ? <OrganizationsLink /> : null}
            </NavDropdown> : null}
    </Navbar>
);

export default NavMenu;