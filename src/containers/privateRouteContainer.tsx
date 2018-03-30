import React from 'react';
import {connect} from "react-redux";
import PrivateRoute from "../components/routeHelperComponents/privateRoute";

class PrivateRouteContainer extends React.Component {
    props: any;

    render() {
        return (
            <PrivateRoute isAuthenticated={this.props.authSession.isAuthenticated} {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps)(PrivateRouteContainer) as any;