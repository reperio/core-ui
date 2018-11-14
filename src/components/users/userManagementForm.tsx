import React from 'react';
import UserManagementGeneralForm from '../../components/users/userManagementGeneralForm';
import Panel from '../../components/panel';
import UserManagementProfile from '../../components/users/UserManagementProfile';
import UserManagementEmailsForm from '../../components/users/userManagementEmailsForm';
import UserManagementOrganizationsForm from '../../components/users/userManagementOrganizationsForm';
import UserManagementRolesForm from '../../components/users/userManagementRolesForm';
import UserManagementControls from '../../components/users/userManagementControls';
import { Redirect } from 'react-router';
import Dropdown from '../../models/dropdown';
import User from '../../models/user';
import Organization from '../../models/organization';
import Role from '../../models/role';
import { CorePermissions } from '../../models/permission';

const Overlay = () => <div className="r-editable-panel-overlay"></div>

interface UserManagementProps {
    addEmailAddress(): void;
    addOrganization(selectedRole: Dropdown): void;
    addRole(selectedRole: Dropdown): void;
    cancelUserPanel(): void;
    deleteUser(): void;
    editUserOrganizations(): void;
    editUserGeneral(): void;
    editUserEmails(): void;
    navigateToUsers(): void;
    removeEmailAddress(): void;
    removeOrganization(organizationId: string): void;
    removeRole(roleId: string): void;
    selectOrganization(): void;
    selectRole(): void;
    sendVerificationEmail(): void;
    setPrimaryEmailAddress(): void;
    submitForm(): void;
    togglePanel(panel: number): void;
    toggleRoleDetails(): void;
    activePanelIndex: number;
    loggedInUser: User;
    managedUser: User;
    organizations: Organization[];
    redirectToErrorPage: boolean;
    roles: Role[];
    selectedOrganization: Dropdown;
    selectedRole: Dropdown;
}

const UserManagementForm: React.SFC<UserManagementProps> = (props: UserManagementProps) => (
    <div style={{flex: 1}}>
    {props.managedUser != null ?
        <div className="management-container">
        {props.redirectToErrorPage ?
            <Redirect to="/error" /> 
        : null }
            {props.activePanelIndex != null ? <Overlay /> : null}
            <div className="management-left">
                <UserManagementProfile top={true} initialValues={props.managedUser} />
                <Panel  active={props.activePanelIndex === 0}
                        permissionToEdit={props.loggedInUser.permissions.includes(CorePermissions.UpdateBasicUserInfo)}
                        onClick={() => { props.activePanelIndex != 0 ? props.togglePanel(0) : null}}
                        submit={props.submitForm.bind(this, 'userManagementGeneralForm')}
                        cancel={props.cancelUserPanel.bind(this)}>
                    <UserManagementGeneralForm  active={props.activePanelIndex === 0}
                                                initialValues={props.managedUser}
                                                onSubmit={props.editUserGeneral.bind(this)}/>
                </Panel>
                <Panel  active={props.activePanelIndex === 1}
                        permissionToEdit={props.loggedInUser.permissions.includes(CorePermissions.AddEmail) || props.loggedInUser.permissions.includes(CorePermissions.DeleteEmail) || props.loggedInUser.permissions.includes(CorePermissions.SetPrimaryEmail) || props.loggedInUser.permissions.includes(CorePermissions.ResendVerificationEmails)}
                        onClick={() => { props.activePanelIndex != 1 ? props.togglePanel(1) : null}}
                        submit={props.submitForm.bind(this, 'userManagementEmailsForm')}
                        cancel={props.cancelUserPanel.bind(this)}>
                    <UserManagementEmailsForm   active={props.activePanelIndex === 1}
                                                initialValues={props.managedUser}
                                                canAddEmails={props.loggedInUser.permissions.includes(CorePermissions.AddEmail)}
                                                canDeleteEmail={props.loggedInUser.permissions.includes(CorePermissions.DeleteEmail)}
                                                canResendVerificationEmail={props.loggedInUser.permissions.includes(CorePermissions.ResendVerificationEmails)}
                                                canSetPrimary={props.loggedInUser.permissions.includes(CorePermissions.SetPrimaryEmail)}
                                                onSubmit={props.editUserEmails.bind(this)}
                                                setPrimaryEmailAddress={props.setPrimaryEmailAddress.bind(this)}
                                                removeEmailAddress={props.removeEmailAddress.bind(this)}
                                                addEmailAddress={props.addEmailAddress.bind(this)}
                                                sendVerificationEmail={props.sendVerificationEmail.bind(this)}/>
                </Panel>
                <Panel  active={props.activePanelIndex === 2}
                        permissionToEdit={props.loggedInUser.permissions.includes(CorePermissions.ManageUserOrganizations)}
                        onClick={() => { props.activePanelIndex != 2 ? props.togglePanel(2) : null}}
                        submit={props.submitForm.bind(this, 'userManagementOrganizationsForm')}
                        cancel={props.cancelUserPanel.bind(this)}>
                    <UserManagementOrganizationsForm    active={props.activePanelIndex === 2}
                                                        initialValues={props.managedUser}
                                                        organizations={props.organizations}
                                                        onSubmit={props.editUserOrganizations.bind(this)}
                                                        removeOrganization={props.removeOrganization.bind(this)}
                                                        selectedOrganization={props.selectedOrganization}
                                                        selectOrganization={props.selectOrganization.bind(this)}
                                                        addOrganization={props.addOrganization.bind(this)}/>
                </Panel>
                <Panel  active={props.activePanelIndex === 3}
                        permissionToEdit={props.loggedInUser.permissions.includes(CorePermissions.ManageUserRoles)}
                        onClick={() => { props.activePanelIndex != 3 ? props.togglePanel(3) : null}}
                        submit={props.submitForm.bind(this, 'userManagementRolesForm')}
                        cancel={props.cancelUserPanel.bind(this)}>
                    <UserManagementRolesForm    active={props.activePanelIndex === 3}
                                                initialValues={props.managedUser}
                                                roles={props.roles}
                                                selectRole={props.selectRole.bind(this)}
                                                selectedRole={props.selectedRole}
                                                addRole={props.addRole.bind(this)}
                                                toggleRoleDetails={props.toggleRoleDetails.bind(this)}
                                                removeRole={props.removeRole.bind(this)}
                                                organizations={props.organizations}
                                                onSubmit={props.editUserOrganizations.bind(this)}/>
                </Panel>
                <UserManagementControls right={false} 
                                        canDeleteUser={props.loggedInUser.permissions.includes(CorePermissions.DeleteUsers)}
                                        children={null}
                                        deleteUser={props.deleteUser.bind(this)}
                                        navigateToUsers={props.navigateToUsers.bind(this)} />
            </div>
            <UserManagementControls right={true} 
                                    children={
                                        <UserManagementProfile  top={false} initialValues={props.managedUser} />
                                    }
                                    canDeleteUser={props.loggedInUser.permissions.includes(CorePermissions.DeleteUsers)}
                                    deleteUser={props.deleteUser.bind(this)}
                                    navigateToUsers={props.navigateToUsers.bind(this)} />
        </div>
    : null}
    </div>
);

export default UserManagementForm;