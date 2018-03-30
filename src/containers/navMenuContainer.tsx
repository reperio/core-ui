import React from 'react'
import {connect} from "react-redux";

import NavMenu from "../components/navMenu/navMenu";

class NavMenuContainer extends React.Component {
    props: any;

    render() {
        return (
            <NavMenu authSession={this.props.authSession} />
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps, null, null, {pure: false})(NavMenuContainer);