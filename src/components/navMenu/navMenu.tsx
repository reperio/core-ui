import React from 'react'
import {Navbar, LinkContainer, NavItem, ApplicationMenuItem} from '@reperio/ui-components'
import NavMenuLoginLink from './navMenuLoginLink';
import { NavDropdown } from 'react-bootstrap';

const NavMenu = (props: any) => (
    <Navbar
        authenticated={props.authSession.isAuthenticated}
        profile={props.authSession.user != null ? {
            initials: `${props.authSession.user.firstName.charAt(0).toUpperCase()}${props.authSession.user.lastName.charAt(0).toUpperCase()}`,
            name: `${props.authSession.user.firstName} ${props.authSession.user.lastName}`,
            accountName: 'Reper.io',
            phone: '1234567890',
            email:props.authSession.user.primaryEmail,
            onLogout: props.logout} : null}
        linkContainers={[
            props.authSession.isAuthenticated ?
                <LinkContainer key="1" exact to="/home">
                    <NavItem>
                        Home
                    </NavItem>
                </LinkContainer> : null,
            props.authSession.isAuthenticated ?
                <LinkContainer key="2" exact to="/users">
                    <NavItem>
                        Users
                    </NavItem>
                </LinkContainer> : null,
            props.authSession.isAuthenticated ?
            <LinkContainer key="3" exact to="/roles">
                <NavItem>
                    Roles
                </NavItem>
            </LinkContainer> : null,
            !props.authSession.isAuthenticated ?
                <LinkContainer key="4" exact to="/signup">
                    <NavItem>
                        Signup
                    </NavItem> 
                </LinkContainer> : null,
            !props.authSession.isAuthenticated ?
                <LinkContainer key="5" exact to="">
                    <NavMenuLoginLink/>
                </LinkContainer> : null,
            props.authSession.isAuthenticated ?
                <NavDropdown key="6" title="Administration" id="admin-dropdown">
                    {props.authSession.isAuthenticated ?
                        <LinkContainer key="7" exact to="/permissions">
                            <NavItem>
                                Permissions
                            </NavItem>
                        </LinkContainer> : null}
                    {props.authSession.isAuthenticated ?
                        <LinkContainer key="8" exact to="/organizations">
                            <NavItem>
                                Organizations
                            </NavItem>
                        </LinkContainer> : null}
                </NavDropdown> : null
        ]}
        applicationMenuItems={[
            <ApplicationMenuItem key="1" name="Example1" label="Example" />,
            <ApplicationMenuItem key="2" name="Exmaple2" label="Example 2" />,



        ]}>
    </Navbar>
);

export default NavMenu;