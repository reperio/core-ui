import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Users from "../components/users";
import { getUsers, populateUserOrganizations } from '../actions/usersActions';
import { locationChange } from '../actions/navActions';
import { State } from '../store/initialState';

class UsersContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getUsers();
    }

    navigateToUserCreate() {
        this.props.actions.locationChange('/userCreate', null, null);
    }

    navigateToManagement(user: any) {
        this.props.actions.populateUserOrganizations(user.userOrganizations.map((userOrganization:any) => {return {id: userOrganization.organization.id, name: userOrganization.organization.name}}), this.props.authSession.user.userOrganizations);
        this.props.actions.locationChange('/userManagement', Object.assign(user, {organizations: user.userOrganizations.map((userOrganization:any) => {return {id: userOrganization.organization.id, name: userOrganization.organization.name}})}), 'userManagementForm');
    }

    render() {
        return (
            <div>
                <Users gridData={this.props.users.users} navigateToManagement={this.navigateToManagement.bind(this)} navigateToUserCreate={this.navigateToUserCreate.bind(this)} />
            </div>
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
        actions: bindActionCreators({getUsers, locationChange, populateUserOrganizations}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UsersContainer);