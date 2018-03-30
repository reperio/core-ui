import React from 'react'
import {connect} from "react-redux";

import MainDashboard from "../components/mainDashboard";

class MainDashboardContainer extends React.Component {
    props: any;

    render() {
        return (
            <MainDashboard authSession={this.props.authSession} />
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps, null, null, {pure: false})(MainDashboardContainer);