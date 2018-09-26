import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { loadManagementInitialOrganization, editOrganization, clearManagementInitialOrganization, removeUserFromOrganization, deleteOrganization, selectUser, addUser } from '../../actions/organizationsActions';
import { locationChange } from '../../actions/navActions';
import OrganizationManagementForm from '../../components/organizations/organizationManagementForm';
import { formValueSelector, change } from 'redux-form';

class UserManagementFormValues {
    id: number;
    name: string;
    selectedUsers: any[];
}

class OrganizationManagementFormContainer extends React.Component {
    props: any;

    async onSubmit(form: UserManagementFormValues) {
        await this.props.actions.editOrganization(form.id, form.name, form.selectedUsers.map((selectedUser: any) => selectedUser.value));
    };

    async componentDidMount() {
        this.props.actions.clearManagementInitialOrganization();
        await this.props.actions.loadManagementInitialOrganization(this.props.match.params.organizationId);
    }

    navigateToOrganizations() {
        this.props.actions.locationChange('/organizations', null, null);
    }

    removeUser(index: number){
        this.props.actions.removeUserFromOrganization(index);
    }

    selectUser(permission: any) {
        this.props.actions.selectUser(permission);
    }

    addUser(permission: any) {
        this.props.actions.addUser(permission);
    }

    deleteOrganization(roleId: any) {
        this.props.actions.deleteOrganization(roleId);
    }

    render() {
        return (
            <div>
                <OrganizationManagementForm navigateToOrganizations={this.navigateToOrganizations.bind(this)} 
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
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('organizationManagementForm');
    const organizationManagement = state.organizationManagement;
    return {
        initialOrganization: organizationManagement.initialOrganization != null ? {
            id: organizationManagement.initialOrganization.id,
            name: organizationManagement.initialOrganization.name,
            selectedUsers: organizationManagement.initialOrganization.selectedUsers
        } : null,
        isError: organizationManagement.isError,
        errorMessage: organizationManagement.errorMessage,
        authSession: state.authSession,
        users: organizationManagement.users,
        selectedUser: selector(state, 'selectedUser')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editOrganization, locationChange, loadManagementInitialOrganization, clearManagementInitialOrganization, removeUserFromOrganization, deleteOrganization, addUser, selectUser}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationManagementFormContainer);