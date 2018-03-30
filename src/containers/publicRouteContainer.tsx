import React from 'react';
import {connect} from "react-redux";
import PublicRoute from "../components/routeHelperComponents/publicRoute";

class PublicRouteContainer extends React.Component {
    props: any;

    render() {
        return (
            <PublicRoute isAuthenticated={this.props.authSession.isAuthenticated} {...this.props} />
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps)(PublicRouteContainer) as any;