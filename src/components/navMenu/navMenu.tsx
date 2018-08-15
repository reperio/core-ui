import React from 'react'
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import { NavLink } from 'react-router-dom';

import NavMenuLoginLink from "./navMenuLoginLink";
import NavMenuLogOutLinkContainer from "../../containers/navMenuLogOutLinkContainer";

const NavMenu = (props: any) => (
    <div className="app-sidebar">
        <div className="nav-side-menu">
            <div className="brand">Brand Logo</div>
            <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        
                <div className="menu-list">
        
                    <ul id="menu-content" className="menu-content collapse out">
                    {props.authSession.isAuthenticated ?  
                        <li>
                            <NavLink exact className="app-navlink" to="/home">
                                Home
                            </NavLink>
                        </li> : null 
                    }

                    {props.authSession.isAuthenticated ?  
                        <li>
                            <NavLink exact className="app-navlink" to="/users">
                                Users
                            </NavLink>
                        </li> : null 
                    }

                    {!props.authSession.isAuthenticated ?  
                        <li>
                            <NavLink exact className="app-navlink" to="/signup">
                                Sign Up
                            </NavLink>
                        </li> : null 
                    }    

                        {props.authSession.isAuthenticated ? <NavMenuLogOutLinkContainer/> : <NavMenuLoginLink/>}                      
                        
                    </ul>
            </div>
        </div>
    </div>
    // <div>
    //     {props.authSession.isAuthenticated ? <LinkContainer to="/home"><NavItem>Home</NavItem></LinkContainer> : null}
    //     {props.authSession.isAuthenticated ? <NavMenuLogOutLinkContainer/> : <NavMenuLoginLink/>}
    // </div>
);

export default NavMenu;