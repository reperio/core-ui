import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserManagement from "../components/userManagement";
import { getUsers } from '../actions/usersActions';
import { locationChange } from '../actions/navActions';
import { State } from '../store/initialState';

class UserManagementContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getUsers();
    }

    navigateToUserCreate() {
        this.props.actions.locationChange('/userCreate');
    }

    render() {
        return (
            <UserManagement gridData={this.props.users.users} navigateToUserCreate={this.navigateToUserCreate.bind(this)} />
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
        actions: bindActionCreators({getUsers, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserManagementContainer);