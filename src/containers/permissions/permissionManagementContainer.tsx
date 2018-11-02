import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { loadManagementInitialPermission, editPermission, removePermissionFromRole, clearManagementInitialPermission } from '../../actions/permissionsActions';
import PermissionManagementForm from '../../components/permissions/permissionManagementForm';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import RolePermission from '../../models/rolePermission';

class UserManagementFormValues {
    displayName: string;
    description: string;
    isSystemAdminPermission: boolean;
    rolePermissions: RolePermission[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class PermissionManagementFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: UserManagementFormValues) {
        await this.props.actions.editPermission(this.props.match.params.permissionName, form.displayName, form.description, form.isSystemAdminPermission, form.rolePermissions);
    };

    async componentDidMount() {
        this.props.actions.clearManagementInitialPermission();
        await this.props.actions.loadManagementInitialPermission(this.props.match.params.permissionName);
    }

    navigateToPermissions() {
        history.push('/permissions');
    }

    removePermission(index: number){
        this.props.actions.removePermissionFromRole(index);
    }

    render() {
        return (
            <PermissionManagementForm   navigateToPermissions={this.navigateToPermissions.bind(this)} 
                                        initialValues={this.props.initialPermission}
                                        isError={this.props.isError}
                                        errorMessage={this.props.errorMessage}
                                        removePermission={this.removePermission.bind(this)}
                                        onSubmit={this.onSubmit.bind(this)} />
        );
    }
}

function mapStateToProps(state: State) {
    const permissionManagement = state.permissionManagement;
    return {
        initialPermission: permissionManagement.initialPermission != null ? {
            name: permissionManagement.initialPermission.name,
            displayName: permissionManagement.initialPermission.displayName,
            description: permissionManagement.initialPermission.description,
            isSystemAdminPermission: permissionManagement.initialPermission.isSystemAdminPermission,
            rolePermissions: permissionManagement.initialPermission.rolePermissions
        } : null,
        isError: permissionManagement.isError,
        errorMessage: permissionManagement.errorMessage
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editPermission, loadManagementInitialPermission, removePermissionFromRole, clearManagementInitialPermission}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PermissionManagementFormContainer);