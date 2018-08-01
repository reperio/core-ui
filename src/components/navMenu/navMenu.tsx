import React from 'react'
import {Nav, Navbar, NavItem} from "react-bootstrap";
const reperio = require('../../assets/reperio-logo.png');
import ApplicationsContainer from '../../containers/applications/applicationsContainer';
import ProfileInfoContainer from '../../containers/profileInfo/profileInfoContainer';
import ReperioBarContainer from '../../containers/misc/reperioBarContainer';
import { LinkContainer } from "react-router-bootstrap";

const NavMenu = (props: any) => (
    <div className="nav-menu-container">
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <img className="r-menu-header-icon" src={reperio}/>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav className="r-nav-links">
                {props.authSession.isAuthenticated ?
                    <LinkContainer to="/home">
                        <NavItem>Home</NavItem>
                    </LinkContainer>: null 
                }
                {!props.authSession.isAuthenticated ?
                    <LinkContainer to="/login">
                        <NavItem>Login</NavItem>
                    </LinkContainer>: null 
                }
                {!props.authSession.isAuthenticated ?
                    <LinkContainer to="/signup">
                        <NavItem>Signup</NavItem>
                    </LinkContainer>: null 
                }
            </Nav>
            <Nav pullRight>
                <ApplicationsContainer/>
                <ProfileInfoContainer/>
            </Nav>
        </Navbar>
        <ReperioBarContainer />
    </div>
);

export default NavMenu;