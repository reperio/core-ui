import React from 'react'
import {Navbar, LinkContainer, NavItem} from '@reperio/ui-components'
import { NavDropdown } from 'react-bootstrap';
import { StateAuthSession } from '../../store/initialState';

interface NavMenuProps {
    authSession: StateAuthSession;
}

const NavMenu = (props: NavMenuProps) => (
    <Navbar
        applicationName={"test"}
        authenticated={props.authSession.isAuthenticated}
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
            <LinkContainer key="5" to="/login">
                <NavItem>
                    Login
                </NavItem>
            </LinkContainer> : null,
            props.authSession.isAuthenticated ?
                <NavDropdown pullRight key="6" title="Administration" id="admin-dropdown">
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
        ]}>
    </Navbar>
);

export default NavMenu;