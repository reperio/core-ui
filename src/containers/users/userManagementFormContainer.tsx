import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { editUser, selectOrganization, addOrganization, removeOrganization, clearManagementInitialUser, loadManagementInitialUser, toggleRoleDetails, addRole, removeRole, selectRole, removeEmailAddress, setPrimaryEmailAddress, addEmailAddress} from '../../actions/usersActions';
import { getOrganizations } from '../../actions/organizationsActions';
import { getRoles } from '../../actions/rolesActions';
import { sendVerificationEmail } from '../../actions/authActions';
import { locationChange } from '../../actions/navActions';
import UserManagementForm from '../../components/users/userManagementForm';
import { formValueSelector } from 'redux-form';

class UserManagementFormValues {
    id: string;
    firstName: string;
    lastName: string;
    selectedOrganizations: any[];
    selectedRoles: any[];
    userEmails: any[];
}

class UserManagementFormContainer extends React.Component {
    props: any;

    async onSubmit(form: UserManagementFormValues) {
        await this.props.actions.editUser(form.id, form.firstName, form.lastName, form.selectedOrganizations.map((organization:any) => {return organization.value}), form.selectedRoles.map((role:any) => {return role.value}), form.userEmails, form.userEmails.filter((x: any)=> x.primary));
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

    removeOrganization(index: number) {
        this.props.actions.removeOrganization(index);
    }

    addOrganization(organization: any) {
        this.props.actions.addOrganization(organization);
    }

    toggleRoleDetails(index: number) {
        this.props.actions.toggleRoleDetails(index);
    }

    removeRole(index: number) {
        this.props.actions.removeRole(index);
    }

    addRole(role: any) {
        this.props.actions.addRole(role, this.props.roles);
    }

    setPrimaryEmailAddress(index: number) {
        this.props.actions.setPrimaryEmailAddress(index);
    }

    removeEmailAddress(index: number) {
        this.props.actions.removeEmailAddress(index);
    }

    addEmailAddress() {
        this.props.actions.addEmailAddress();
    }

    sendVerificationEmail(index: number) {
        this.props.actions.sendVerificationEmail(this.props.initialUser.id, this.props.initialUser.userEmails[index].email);
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
                                    setPrimaryEmailAddress={this.setPrimaryEmailAddress.bind(this)}
                                    removeEmailAddress={this.removeEmailAddress.bind(this)}
                                    addEmailAddress={this.addEmailAddress.bind(this)}
                                    sendVerificationEmail={this.sendVerificationEmail.bind(this)}
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
            primaryEmailAddress: initialUser.primaryEmailAddress,
            selectedRoles: initialUser.selectedRoles,
            selectedOrganizations: initialUser.selectedOrganizations,
            userEmails: initialUser.userEmails
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
        actions: bindActionCreators(
            {
                editUser, 
                locationChange, 
                selectOrganization, 
                addOrganization, 
                removeOrganization, 
                clearManagementInitialUser, 
                loadManagementInitialUser, 
                toggleRoleDetails, 
                getOrganizations, 
                addRole, 
                removeRole, 
                getRoles, 
                selectRole, 
                removeEmailAddress, 
                setPrimaryEmailAddress, 
                addEmailAddress, 
                sendVerificationEmail
            }, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserManagementFormContainer);