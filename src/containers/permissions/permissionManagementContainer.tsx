import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { loadManagementInitialPermission, editPermission, removePermissionFromRole, clearManagementInitialPermission } from '../../actions/permissionsActions';
import PermissionManagementForm from '../../components/permissions/permissionManagementForm';
import { formValueSelector } from 'redux-form';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import RolePermission from '../../models/rolePermission';

class UserManagementFormValues {
    id: string;
    displayName: string;
    description: string;
    isSystemAdminPermission: boolean;
    name: string;
    rolePermissions: RolePermission[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class PermissionManagementFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: UserManagementFormValues) {
        await this.props.actions.editPermission(form.id, form.displayName, form.name, form.description, form.isSystemAdminPermission, form.rolePermissions);
    };

    async componentDidMount() {
        this.props.actions.clearManagementInitialPermission();
        await this.props.actions.loadManagementInitialPermission(this.props.match.params.permissionId);
    }

    navigateToPermissions() {
        history.push('/permissions');
    }

    removePermission(index: number){
        this.props.actions.removePermissionFromRole(index);
    }

    render() {
        return (
            <div>
                <PermissionManagementForm   navigateToPermissions={this.navigateToPermissions.bind(this)} 
                                            initialValues={this.props.initialPermission}
                                            isError={this.props.isError}
                                            errorMessage={this.props.errorMessage}
                                            removePermission={this.removePermission.bind(this)}
                                            onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('userManagementForm');
    const permissionManagement = state.permissionManagement;
    return {
        initialPermission: permissionManagement.initialPermission != null ? {
            id: permissionManagement.initialPermission.id,
            name: permissionManagement.initialPermission.name,
            displayName: permissionManagement.initialPermission.displayName,
            description: permissionManagement.initialPermission.description,
            isSystemAdminPermission: permissionManagement.initialPermission.isSystemAdminPermission,
            rolePermissions: permissionManagement.initialPermission.rolePermissions
        } : null,
        isError: permissionManagement.isError,
        errorMessage: permissionManagement.errorMessage,
        authSession: state.authSession,
        selectedOrganization: selector(state, 'selectedOrganization')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editPermission, loadManagementInitialPermission, removePermissionFromRole, clearManagementInitialPermission}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PermissionManagementFormContainer);