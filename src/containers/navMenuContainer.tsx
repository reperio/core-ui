import React from 'react'
import {connect} from "react-redux";

import NavMenu from "../components/navMenu/navMenu";
import { State } from '../store/initialState';

class NavMenuContainer extends React.Component {
    props: any;

    render() {
        return (
            <div className="r-nav-menu">
                <NavMenu authSession={this.props.authSession} applications={this.props.applications} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        applications: state.applications
    };
}

export default connect(mapStateToProps, null, null, {pure: false})(NavMenuContainer);