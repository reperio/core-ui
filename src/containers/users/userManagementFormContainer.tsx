import React from 'react'
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { selectOrganization, addOrganization, removeOrganization, clearManagementInitialUser, loadManagementInitialUser, toggleRoleDetails, 
    addRole, removeRole, selectRole, removeEmailAddress, setPrimaryEmailAddress, addEmailAddress, togglePanel, cancelUserPanel, editUserGeneral, 
    editUserEmails, editUserOrganizations} from '../../actions/usersActions';
import { getOrganizations } from '../../actions/organizationsActions';
import { getRoles } from '../../actions/rolesActions';
import { sendVerificationEmail } from '../../actions/authActions';
import { formValueSelector } from 'redux-form';
import { RouteComponentProps } from 'react-router';
import { history } from '../../store/history';
import SelectedRole from '../../models/selectedRole';
import UserEmail from '../../models/userEmail';
import Dropdown from '../../models/dropdown';
import { connect } from 'react-redux';
import {submitForm} from '../../actions/miscActions';
import UserManagementForm from '../../components/users/userManagementForm';

class UserManagementFormValues {
    id: string;
    firstName: string;
    lastName: string;
    selectedOrganizations: Dropdown[];
    selectedRoles: SelectedRole[];
    userEmails: UserEmail[];
}

interface OwnProps {}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class UserManagementFormContainer extends React.Component<RouteComponentProps<any> & OwnProps & StateProps & DispatchProps> {

     async componentDidMount() {
        this.props.actions.clearManagementInitialUser();
        await this.props.actions.getOrganizations();
        await this.props.actions.getRoles();
        await this.props.actions.loadManagementInitialUser(this.props.match.params.userId);
     }

    navigateToUsers() {
        history.push('/users');
    }

    selectOrganization(organization: Dropdown) {
        this.props.actions.selectOrganization(organization);
    }

    selectRole(role: SelectedRole) {
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

    addRole(role: Dropdown) {
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
        this.props.actions.sendVerificationEmail(this.props.user.id, this.props.user.userEmails[index].email);
    }

    togglePanel(index: number) {
        this.props.actions.togglePanel(index);
    }

    submitForm(formName: string) {
        this.props.actions.submitForm(formName);
    }

    editUserGeneral(form: UserManagementFormValues) {
        this.props.actions.editUserGeneral(form.id, form.firstName, form.lastName);
    }

    cancelUserPanel() {
        this.props.actions.cancelUserPanel();
    }

    editUserEmails(form: UserManagementFormValues) {
        const primaryEmailAddress = form.userEmails
            .filter((x: UserEmail)=> x.primary);

        this.props.actions.editUserEmails(form.id, form.userEmails, this.props.initialUser, primaryEmailAddress);
    }

    editUserOrganizations(form: UserManagementFormValues) {
        const selectedOrganizations = form.selectedOrganizations
            .map((organization: Dropdown) => {
                return organization.value
            });

        this.props.actions.editUserOrganizations(form.id, selectedOrganizations);
    }

    render() {
        return (
            <UserManagementForm activePanelIndex={this.props.activePanelIndex}
                                addEmailAddress={this.addEmailAddress.bind(this)}
                                addOrganization={this.addOrganization.bind(this)}
                                addRole={this.addRole.bind(this)}
                                cancelUserPanel={this.cancelUserPanel.bind(this)}
                                editUserEmails={this.editUserEmails.bind(this)}
                                editUserGeneral={this.editUserGeneral.bind(this)}
                                editUserOrganizations={this.editUserOrganizations.bind(this)}
                                navigateToUsers={this.navigateToUsers.bind(this)} 
                                organizations={this.props.organizations}
                                redirectToErrorPage={this.props.redirectToErrorPage}
                                removeEmailAddress={this.removeEmailAddress.bind(this)}
                                removeOrganization={this.removeOrganization.bind(this)}
                                removeRole={this.removeRole.bind(this)}
                                roles={this.props.roles}
                                selectOrganization={this.selectOrganization.bind(this)}
                                selectedOrganization={this.props.selectedOrganization}
                                selectRole={this.selectRole.bind(this)}
                                selectedRole={this.props.selectedRole}
                                submitForm={this.submitForm.bind(this)}
                                sendVerificationEmail={this.sendVerificationEmail.bind(this)}
                                setPrimaryEmailAddress={this.setPrimaryEmailAddress.bind(this)}
                                togglePanel={this.togglePanel.bind(this)}
                                toggleRoleDetails={this.toggleRoleDetails.bind(this)}
                                user={this.props.user}/>
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
        selectedOrganization: organizationsSelector(state, 'selectedOrganization') as Dropdown,
        selectedRole: rolesSelector(state, 'selectedRole') as SelectedRole,
        redirectToErrorPage: state.organizations.isError || state.roles.isError || state.userManagement.isError,
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
                removeEmailAddress, 
                setPrimaryEmailAddress, 
                addEmailAddress,
                sendVerificationEmail,
                togglePanel,
                cancelUserPanel,
                editUserGeneral,
                submitForm,
                editUserEmails,
                editUserOrganizations
            }, dispatch)
        };
    }
        

export default connect(mapStateToProps, mapActionToProps)(UserManagementFormContainer);