import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {logout} from "../actions/authActions";
import NavMenuLogOutLink from "../components/navMenu/navMenuLogOutLink";

class NavMenuLogOutLinkContainer extends React.Component {
    props: any;

    render() {
        return (
            <NavMenuLogOutLink logout={this.props.actions.logout} />
        );
    }
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({logout}, dispatch)
    };
}

export default connect(null, mapActionToProps)(NavMenuLogOutLinkContainer);