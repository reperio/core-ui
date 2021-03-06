import React from 'react';
import UserManagementGeneralForm from '../../components/users/userManagementGeneralForm';
import UserManagementProfile from '../../components/users/UserManagementProfile';
import UserManagementEmailsForm from '../../components/users/userManagementEmailsForm';
import UserManagementOrganizationsForm from '../../components/users/userManagementOrganizationsForm';
import UserManagementRolesForm from '../../components/users/userManagementRolesForm';
import UserManagementControls from '../../components/users/userManagementControls';
import { Redirect } from 'react-router';
import Dropdown from '../../models/dropdown';
import { UserViewModel } from '../../models/userViewModel';
import { Organization, Role, User, CorePermissions } from '@reperio/core-connector';
import { EditablePanel, EditablePanelOverlay } from '@reperio/ui-components';

interface UserManagementProps {
    addOrganization(selectedRole: Dropdown): void;
    addRole(selectedRole: Dropdown): void;
    cancelUserPanel(): void;
    deleteUser(): void;
    editUserOrganizations(): void;
    editUserGeneral(): void;
    editUserRoles(): void;
    navigateToUsers(): void;
    removeOrganization(organizationId: string): void;
    removeRole(roleId: string): void;
    selectOrganization(): void;
    selectRole(): void;
    sendVerificationEmail(): void;
    submitForm(): void;
    togglePanel(panel: number): void;
    toggleRoleDetails(): void;
    activePanelIndex: number;
    activeRoleDetailIndex: number;
    loggedInUser: User;
    managedUser: UserViewModel;
    organizations: Organization[];
    redirectToErrorPage: boolean;
    roles: Role[];
    selectedOrganization: Organization;
    selectedRole: Role;
}

const UserManagementForm: React.SFC<UserManagementProps> = (props: UserManagementProps) => (
    <React.Fragment>
    {props.redirectToErrorPage ? <Redirect to="/error" /> : null }
    {props.managedUser != null ?
        <div className="management-container">
            {props.activePanelIndex != null ? <EditablePanelOverlay /> : null}
            <div className="management-left">
                <UserManagementProfile top={true} userViewModel={props.managedUser} />
                <EditablePanel  active={props.activePanelIndex === 0}
                                permissionToEdit={props.loggedInUser.permissions.includes(CorePermissions.UpdateBasicUserInfo)}
                                onClick={() => { props.activePanelIndex != 0 ? props.togglePanel(0) : null}}
                                submit={props.submitForm.bind(this, 'userManagementGeneralForm')}
                                cancel={props.cancelUserPanel.bind(this)}>
                    <UserManagementGeneralForm  active={props.activePanelIndex === 0}
                                                initialValues={props.managedUser.user}
                                                onSubmit={props.editUserGeneral.bind(this)}/>
                </EditablePanel>
                {props.loggedInUser.permissions.includes(CorePermissions.ViewOrganizations) ?
                    <EditablePanel  active={props.activePanelIndex === 2}
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
                    </EditablePanel>
                : null}
                {props.loggedInUser.permissions.includes(CorePermissions.ViewRoles) ?
                    <EditablePanel  active={props.activePanelIndex === 3}
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
                                                    onSubmit={props.editUserRoles.bind(this)}/>
                    </EditablePanel>
                : null }
                <UserManagementControls right={false} 
                                        canDeleteUser={props.loggedInUser.permissions.includes(CorePermissions.DeleteUsers)}
                                        children={null}
                                        deleteUser={props.deleteUser.bind(this)}
                                        navigateToUsers={props.navigateToUsers.bind(this)} />
            </div>
            <UserManagementControls right={true} 
                                    children={
                                        <UserManagementProfile  top={false} userViewModel={props.managedUser} />
                                    }
                                    canDeleteUser={props.loggedInUser.permissions.includes(CorePermissions.DeleteUsers)}
                                    deleteUser={props.deleteUser.bind(this)}
                                    navigateToUsers={props.navigateToUsers.bind(this)} />
        </div>
    : null}
    </React.Fragment>
);

export default UserManagementForm;