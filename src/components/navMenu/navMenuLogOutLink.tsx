import React from 'react'
import {NavItem} from "react-bootstrap";

interface NavMenuLogoutProps {
    logout(): void;
}

const NavMenuLogOutLink = (props: NavMenuLogoutProps) => (
    <NavItem onClick={props.logout}>
        <i className="fa fa-sign-out fa-lg"></i> Log Out
    </NavItem>
);

export default NavMenuLogOutLink;