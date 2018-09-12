import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../store/initialState';
import { editUser, selectOrganization, addOrganization, removeOrganization } from '../actions/usersActions';
import { locationChange } from '../actions/navActions';
import UserManagementForm from '../components/userManagementForm';
import { formValueSelector } from 'redux-form';
import { Redirect } from 'react-router';

class UserManagementFormValues {
    user: {
        primaryEmail: string;
        firstName: string;
        lastName: string;
    }
}

class UserManagementFormContainer extends React.Component {
    props: any;

    async onSubmit(values: UserManagementFormValues) {
        await this.props.actions.editUser(this.props.user.id, values.user.primaryEmail, values.user.firstName, values.user.lastName, this.props.organizations.map((organization:any) => {return organization.id}));
    };

    navigateToUsers() {
        this.props.actions.locationChange('/users', null, null);
    }

    selectOrganization(organization: any) {
        this.props.actions.selectOrganization(organization);
    }

    removeOrganization(organization: any) {
        this.props.actions.removeOrganization(organization);
    }

    addOrganization(organization: any) {
        this.props.actions.addOrganization(organization);
    }

    render() {
        return (
            <div>
                {this.props.user ?
                    <UserManagementForm navigateToUsers={this.navigateToUsers.bind(this)} 
                                        initialValues={{user: this.props.user, organizations: this.props.organizations}}
                                        onSubmit={this.onSubmit.bind(this)}
                                        selectedOrganization={this.props.selectedOrganization}
                                        organizations={this.props.authSession.user.userOrganizations.map((x:any) => {return {id: x.organization.id, name: x.organization.name}})}
                                        selectOrganization={this.selectOrganization.bind(this)} 
                                        addOrganization={this.addOrganization.bind(this)}
                                        removeOrganization={this.removeOrganization.bind(this)} />
                : 
                     <Redirect to="/users" />
                }
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('userManagementForm');
    return {
        authSession: state.authSession,
        user: selector(state, 'payload'),
        organizations: selector(state, 'organizations'),
        selectedOrganization: selector(state, 'selectedOrganization')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editUser, locationChange, selectOrganization, addOrganization, removeOrganization}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserManagementFormContainer);