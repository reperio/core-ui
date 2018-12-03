import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { loadManagementInitialOrganization, editOrganization, removeUserFromOrganization, deleteOrganization, selectUser, addUser } from '../../actions/organizationsActions';
import OrganizationManagementForm from '../../components/organizations/organizationManagementForm';
import { formValueSelector } from 'redux-form';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import Dropdown from '../../models/dropdown';
import { CorePermissions } from '../../models/permission';

class UserManagementFormValues {
    id: string;
    name: string;
    selectedUsers: Dropdown[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class OrganizationManagementFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: UserManagementFormValues) {
        const selectedUsers = form.selectedUsers.map((selectedUser: Dropdown) => selectedUser.value);
        await this.props.actions.editOrganization(form.id, form.name, selectedUsers);
    };

    async componentDidMount() {
        await this.props.actions.loadManagementInitialOrganization(this.props.match.params.organizationId);
    }

    navigateToOrganizations() {
        history.push('/organizations');
    }

    removeUser(index: number){
        this.props.actions.removeUserFromOrganization(index);
    }

    selectUser(permission: Dropdown) {
        this.props.actions.selectUser(permission);
    }

    addUser(permission: Dropdown) {
        this.props.actions.addUser(permission);
    }

    deleteOrganization(roleId: string) {
        this.props.actions.deleteOrganization(roleId);
    }

    render() {
        return (
            <OrganizationManagementForm navigateToOrganizations={this.navigateToOrganizations.bind(this)}
                                        canUpdateOrganizations={this.props.authSession.user.permissions.includes(CorePermissions.UpdateOrganizations)}
                                        canDeleteOrganizations={this.props.authSession.user.permissions.includes(CorePermissions.DeleteOrganizations)}
                                        initialValues={this.props.initialOrganization}
                                        isError={this.props.isError}
                                        errorMessage={this.props.errorMessage}
                                        removeUser={this.removeUser.bind(this)}
                                        deleteOrganization={this.deleteOrganization.bind(this)}
                                        selectedUser={this.props.selectedUser}
                                        addUser={this.addUser.bind(this)}
                                        selectUser={this.selectUser.bind(this)}
                                        users={this.props.users}
                                        onSubmit={this.onSubmit.bind(this)} />
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('organizationManagementForm');
    const organizationManagement = state.organizationManagement;
    return {
        initialOrganization: organizationManagement.initialOrganization,
        isError: organizationManagement.isError,
        errorMessage: organizationManagement.errorMessage,
        authSession: state.authSession,
        users: organizationManagement.users,
        selectedUser: selector(state, 'selectedUser') as Dropdown
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editOrganization, loadManagementInitialOrganization, removeUserFromOrganization, deleteOrganization, addUser, selectUser}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationManagementFormContainer);