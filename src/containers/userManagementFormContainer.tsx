import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../store/initialState';
import { editUser, selectOrganization, addOrganization, removeOrganization, clearManagementInitialUser, loadManagementInitialUser, toggleRoleDetails, addRole, removeRole, selectRole} from '../actions/usersActions';
import { getOrganizations } from '../actions/organizationsActions';
import { getRoles } from '../actions/rolesActions';
import { locationChange } from '../actions/navActions';
import UserManagementForm from '../components/userManagementForm';
import { formValueSelector } from 'redux-form';

class UserManagementFormValues {
    id: number;
    primaryEmail: string;
    firstName: string;
    lastName: string;
    selectedOrganizations: any[];
    selectedRoles: any[];
}

class UserManagementFormContainer extends React.Component {
    props: any;

    async onSubmit(form: UserManagementFormValues) {
        await this.props.actions.editUser(form.id, form.primaryEmail, form.firstName, form.lastName, form.selectedOrganizations.map((organization:any) => {return organization.value}), form.selectedRoles.map((role:any) => {return role.value}));
    };

    async componentDidMount() {
        this.props.actions.clearManagementInitialUser();
        await this.props.actions.getOrganizations();
        await this.props.actions.getRoles();
        await this.props.actions.loadManagementInitialUser(this.props.match.params.userId);
    }

    navigateToUsers() {
        this.props.actions.locationChange('/users', null, null);
    }

    selectOrganization(organization: any) {
        this.props.actions.selectOrganization(organization);
    }

    selectRole(role: any) {
        this.props.actions.selectRole(role);
    }

    removeOrganization(organization: any) {
        this.props.actions.removeOrganization(organization);
    }

    addOrganization(organization: any) {
        this.props.actions.addOrganization(organization);
    }

    toggleRoleDetails(index: number) {
        this.props.actions.toggleRoleDetails(index);
    }

    removeRole(role: any) {
        this.props.actions.removeRole(role);
    }

    addRole(role: any) {
        this.props.actions.addRole(role, this.props.roles);
    }

    render() {
        return (
            <div>
                <UserManagementForm navigateToUsers={this.navigateToUsers.bind(this)} 
                                    initialValues={this.props.initialUser}
                                    onSubmit={this.onSubmit.bind(this)}
                                    selectedOrganization={this.props.selectedOrganization}
                                    selectedRole={this.props.selectedRole}
                                    organizations={this.props.organizations}
                                    roles={this.props.roles}
                                    selectOrganization={this.selectOrganization.bind(this)}
                                    selectRole={this.selectRole.bind(this)}
                                    addOrganization={this.addOrganization.bind(this)}
                                    addRole={this.addRole.bind(this)}
                                    toggleRoleDetails={this.toggleRoleDetails.bind(this)}
                                    removeRole={this.removeRole.bind(this)}
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
            selectedRoles: initialUser.selectedRoles,
            selectedOrganizations: initialUser.selectedOrganizations
        } : null,
        organizations: state.organizations.organizations,
        roles: state.roles.roles,
        authSession: state.authSession,
        selectedOrganization: selector(state, 'selectedOrganization'),
        selectedRole: selector(state, 'selectedRole')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editUser, locationChange, selectOrganization, addOrganization, removeOrganization, clearManagementInitialUser, loadManagementInitialUser, toggleRoleDetails, getOrganizations, addRole, removeRole, getRoles, selectRole}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserManagementFormContainer);