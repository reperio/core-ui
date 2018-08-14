import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserManagement from "../components/userManagement";
import { State } from '../store/initialState';

class UserManagementContainer extends React.Component {
    props: any;

    render() {
        return (
            <UserManagement gridData={this.props.users} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        users: state.users
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserManagementContainer);