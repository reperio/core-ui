import React from 'react'
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { selectOrganization, addOrganization, removeOrganization, clearManagementInitialUser, loadManagementInitialUser, toggleRoleDetails, 
    addRole, removeRole, selectRole, togglePanel, cancelUserPanel,
    editUserGeneral, editUserOrganizations, editUserRoles, deleteUser } from '../../actions/usersActions';
import { getOrganizations } from '../../actions/organizationsActions';
import { getRoles } from '../../actions/rolesActions';
import { sendVerificationEmail } from '../../actions/authActions';
import { formValueSelector } from 'redux-form';
import { RouteComponentProps } from 'react-router';
import { history } from '../../store/history';
import Dropdown from '../../models/dropdown';
import { connect } from 'react-redux';
import {submitForm} from '../../actions/miscActions';
import UserManagementForm from '../../components/users/userManagementForm';
import { Role, UserEmail, Organization, CorePermissions } from '@reperio/core-connector'

class UserManagementFormValues {
    firstName: string;
    lastName: string;
    selectedOrganizations: Dropdown[];
}

interface OwnProps {}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class UserManagementFormContainer extends React.Component<RouteComponentProps<any> & OwnProps & StateProps & DispatchProps> {

     async componentDidMount() {
        this.props.actions.clearManagementInitialUser();
        
        if (this.props.authSession.user.permissions.includes(CorePermissions.ViewOrganizations)) {
            await this.props.actions.getOrganizations();
        }

        if (this.props.authSession.user.permissions.includes(CorePermissions.ViewRoles)) {
            await this.props.actions.getRoles();
        }

        await this.props.actions.loadManagementInitialUser(this.props.match.params.userId);
     }

    navigateToUsers() {
        history.push('/users');
    }

    selectOrganization(dropdown: Dropdown) {
        this.props.actions.selectOrganization(dropdown.value);
    }

    selectRole(dropdown: Dropdown) {
        this.props.actions.selectRole(dropdown.value);
    }

    removeOrganization(index: number) {
        this.props.actions.removeOrganization(index);
    }

    addOrganization(organization: any) {
        this.props.actions.addOrganization(organization);
    }

    toggleRoleDetails(index: number) {
        this.props.actions.toggleRoleDetails(index, this.props.activeRoleDetailIndex);
    }

    removeRole(index: number) {
        this.props.actions.removeRole(index);
    }

    addRole(role: Dropdown) {
        this.props.actions.addRole(role);
    }

    sendVerificationEmail(index: number) {
        this.props.actions.sendVerificationEmail(this.props.user.user.id, this.props.user.user.primaryEmailAddress);
    }

    togglePanel(index: number) {
        this.props.actions.togglePanel(index);
    }

    submitForm(formName: string) {
        this.props.actions.submitForm(formName);
    }

    editUserGeneral(form: UserManagementFormValues) {
        this.props.actions.editUserGeneral(this.props.initialUser.user.id, form.firstName, form.lastName);
    }

    cancelUserPanel() {
        this.props.actions.cancelUserPanel();
    }

    editUserOrganizations() {
        this.props.actions.editUserOrganizations(this.props.initialUser.user.id);
    }

    deleteUser() {
        this.props.actions.deleteUser(this.props.initialUser.user.id);
    }

    editUserRoles() {
        this.props.actions.editUserRoles(this.props.initialUser.user.id, this.props.user.selectedRoles.map(role=> role.id));
    }

    render() {
        return (
            <UserManagementForm activePanelIndex={this.props.activePanelIndex}
                                activeRoleDetailIndex={this.props.activeRoleDetailIndex}
                                addOrganization={this.addOrganization.bind(this)}
                                addRole={this.addRole.bind(this)}
                                cancelUserPanel={this.cancelUserPanel.bind(this)}
                                deleteUser={this.deleteUser.bind(this)}
                                editUserGeneral={this.editUserGeneral.bind(this)}
                                editUserOrganizations={this.editUserOrganizations.bind(this)}
                                editUserRoles={this.editUserRoles.bind(this)}
                                navigateToUsers={this.navigateToUsers.bind(this)} 
                                organizations={this.props.organizations}
                                redirectToErrorPage={this.props.redirectToErrorPage}
                                removeOrganization={this.removeOrganization.bind(this)}
                                removeRole={this.removeRole.bind(this)}
                                roles={this.props.roles}
                                selectOrganization={this.selectOrganization.bind(this)}
                                selectedOrganization={this.props.selectedOrganization}
                                selectRole={this.selectRole.bind(this)}
                                selectedRole={this.props.selectedRole}
                                submitForm={this.submitForm.bind(this)}
                                sendVerificationEmail={this.sendVerificationEmail.bind(this)}
                                togglePanel={this.togglePanel.bind(this)}
                                toggleRoleDetails={this.toggleRoleDetails.bind(this)}
                                loggedInUser={this.props.authSession.user}
                                managedUser={this.props.user}/>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('userManagementForm');
    const organizationsSelector = formValueSelector('userManagementOrganizationsForm');
    const rolesSelector = formValueSelector('userManagementRolesForm');

    return {
        user: state.userManagement.user,
        initialUser: state.userManagement.initialUser,
        organizations: state.organizations.organizations,
        roles: state.roles.roles,
        authSession: state.authSession,
        selectedOrganization: organizationsSelector(state, 'selectedOrganization') as Organization,
        selectedRole: rolesSelector(state, 'selectedRole') as Role,
        redirectToErrorPage: state.organizations.isError || state.roles.isError || state.userManagement.isError,
        activeRoleDetailIndex: rolesSelector(state, 'activeRoleDetailIndex') as number,
        activePanelIndex: selector(state, 'activePanelIndex') as number
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators(
            {
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
                sendVerificationEmail,
                togglePanel,
                cancelUserPanel,
                editUserGeneral,
                submitForm,
                editUserOrganizations,
                deleteUser,
                editUserRoles
            }, dispatch)
        };
    }
        

export default connect(mapStateToProps, mapActionToProps)(UserManagementFormContainer);