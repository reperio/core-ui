import React from 'react'
import {Navbar, LinkContainer, NavItem} from '@reperio/ui-components'
import { NavDropdown } from 'react-bootstrap';

import { StateAuthSession } from '../../store/initialState';
import { CorePermissions } from '@reperio/core-connector';

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

interface AdminDropdownProps {
    permissions: string[];
}

export const AdminDropdown = (props: AdminDropdownProps) => (
    <NavDropdown pullRight title="Administration" id="admin-dropdown">
        {props.permissions.includes(CorePermissions.ViewPermissions) ? <PermissionsLink /> : null}
        {props.permissions.includes(CorePermissions.ViewOrganizations) ? <OrganizationsLink /> : null}
    </NavDropdown>
);

const NavMenu = (props: NavMenuProps) => (
    <Navbar
        applicationName={"Core"}>

        <React.Fragment>
            <HomeLink />
            {props.authSession.user.permissions.includes(CorePermissions.ViewUsers) ? <UsersLink /> : null}
            {props.authSession.user.permissions.includes(CorePermissions.ViewRoles) ? <RolesLink /> : null}
            {props.authSession.user.permissions.includes(CorePermissions.ViewPermissions) || props.authSession.user.permissions.includes(CorePermissions.ViewOrganizations) ?
                <AdminDropdown permissions={props.authSession.user.permissions} /> : null}
        </React.Fragment>
    </Navbar>
);

export default NavMenu;