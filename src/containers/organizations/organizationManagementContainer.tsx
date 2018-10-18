import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { loadManagementInitialOrganization, editOrganization, removeUserFromOrganization, deleteOrganization, selectUser, addUser } from '../../actions/organizationsActions';
import OrganizationManagementForm from '../../components/organizations/organizationManagementForm';
import { formValueSelector } from 'redux-form';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';

class UserManagementFormValues {
    id: string;
    name: string;
    selectedUsers: any[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class OrganizationManagementFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: UserManagementFormValues) {
        await this.props.actions.editOrganization(form.id, form.name, form.selectedUsers.map((selectedUser: any) => selectedUser.value));
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
        initialOrganization: organizationManagement.initialOrganization,
        isError: organizationManagement.isError,
        errorMessage: organizationManagement.errorMessage,
        authSession: state.authSession,
        users: organizationManagement.users,
        selectedUser: selector(state, 'selectedUser')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editOrganization, loadManagementInitialOrganization, removeUserFromOrganization, deleteOrganization, addUser, selectUser}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationManagementFormContainer);