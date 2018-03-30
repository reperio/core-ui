import React from 'react'
import {NavItem} from "react-bootstrap";

const NavMenuLogOutLink = (props: any) => (
    <NavItem onClick={props.logout}>
        <i className="fa fa-sign-out fa-lg"></i> Log Out
    </NavItem>
);

export default NavMenuLogOutLink;