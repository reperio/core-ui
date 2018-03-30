import React from 'react'
import {NavItem} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";

const NavMenuLoginLink = () => (
    <LinkContainer to="/login">
        <NavItem>
            <i className="fa fa-lock fa-lg"></i> Login
        </NavItem>
    </LinkContainer>
);

export default NavMenuLoginLink;