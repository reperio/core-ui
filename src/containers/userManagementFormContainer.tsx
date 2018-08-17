import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserCreateForm from '../components/userCreateForm';
import { State } from '../store/initialState';
import { editUser } from '../actions/usersActions';
import { locationChange } from '../actions/navActions';
import UserManagementForm from '../components/userManagementForm';

class UserManagementFormValues {
    primaryEmail: string;
    firstName: string;
    lastName: string;
    organizations: any[];
}

class UserManagementFormContainer extends React.Component {
    props: any;

    async onSubmit(values: UserManagementFormValues) {
        await this.props.actions.editUser(this.props.authSession.user.id, values.primaryEmail, values.firstName, values.lastName, values.organizations.map((organization:any) => {return organization.value}));
    };

    async navigateToUsers() {
        this.props.actions.locationChange('/users');
    }

    render() {
        return (
            <div>
                <UserManagementForm navigateToUsers={this.navigateToUsers.bind(this)} initialValues={this.props.authSession.user} onSubmit={this.onSubmit.bind(this)} organizations={this.props.authSession.user.userOrganizations.map((userOrganization:any) => { return userOrganization.organization})} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editUser, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserManagementFormContainer);