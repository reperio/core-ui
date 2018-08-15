import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserManagement from "../components/userManagement";
import { getUsers } from '../actions/usersActions';
import { State } from '../store/initialState';

class UserManagementContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getUsers();
    }

    render() {
        return (
            <UserManagement gridData={this.props.users.users} />
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
        actions: bindActionCreators({getUsers}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserManagementContainer);