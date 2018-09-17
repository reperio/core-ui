import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../store/initialState';
import { editUser, selectOrganization, addOrganization, removeOrganization, clearManagementInitialUser, loadManagementInitialUser } from '../actions/usersActions';
import { locationChange } from '../actions/navActions';
import UserManagementForm from '../components/userManagementForm';
import { formValueSelector, change } from 'redux-form';
import { Redirect } from 'react-router';

class UserManagementFormValues {
    id: number;
    primaryEmail: string;
    firstName: string;
    lastName: string;
    adminOrganizations: any[];
}

class UserManagementFormContainer extends React.Component {
    props: any;

    async onSubmit(form: UserManagementFormValues) {
        await this.props.actions.editUser(form.id, form.primaryEmail, form.firstName, form.lastName, form.adminOrganizations.map((organization:any) => {return organization.value}));
    };

    async componentDidMount() {
        this.props.actions.clearManagementInitialUser();
        await this.props.actions.loadManagementInitialUser(this.props.match.params.userId, this.props.authSession.user.userOrganizations);
    }

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
                <UserManagementForm navigateToUsers={this.navigateToUsers.bind(this)} 
                                    initialValues={this.props.initialUser}
                                    onSubmit={this.onSubmit.bind(this)}
                                    selectedOrganization={this.props.selectedOrganization}
                                    organizations={this.props.authSession.user.userOrganizations.map((x:any) => {return x.organization})}
                                    selectOrganization={this.selectOrganization.bind(this)} 
                                    addOrganization={this.addOrganization.bind(this)}
                                    removeOrganization={this.removeOrganization.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('userManagementForm');
    const initialUser = state.userManagement.initialUser;
    return {
        initialUser: initialUser != null ? {
            id: initialUser.id,
            firstName: initialUser.firstName,
            lastName: initialUser.lastName,
            primaryEmail: initialUser.primaryEmail,
            adminOrganizations: initialUser.adminOrganizations
        } : null,
        authSession: state.authSession,
        selectedOrganization: selector(state, 'selectedOrganization')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editUser, locationChange, selectOrganization, addOrganization, removeOrganization, clearManagementInitialUser, loadManagementInitialUser}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserManagementFormContainer);