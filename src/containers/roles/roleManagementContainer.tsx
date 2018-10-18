import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { editRole, loadManagementInitialRole, removePermissionFromRole, selectPermission, addPermission, deleteRole} from '../../actions/rolesActions';
import RoleManagementForm from '../../components/roles/roleManagementForm';
import { formValueSelector } from 'redux-form';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';

class RoleManagementFormValues {
    id: string;
    name: string;
    selectedPermissions: any[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class RoleManagementFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: RoleManagementFormValues) {
        const permissions = form.selectedPermissions
            .map((permission:any) => {
                return permission.value
            });

        await this.props.actions.editRole(form.id, form.name, permissions);
    };

    async componentDidMount() {
        await this.props.actions.loadManagementInitialRole(this.props.match.params.roleId);
    }

    navigateToRoles() {
        history.push('/roles');
    }

    removePermission(index: number){
        this.props.actions.removePermissionFromRole(index);
    }

    selectPermission(permission: any) {
        this.props.actions.selectPermission(permission);
    }

    addPermission(permission: any) {
        this.props.actions.addPermission(permission);
    }

    deleteRole(roleId: any) {
        this.props.actions.deleteRole(roleId);
    }

    render() {
        return (
            <div>
                <RoleManagementForm navigateToRoles={this.navigateToRoles.bind(this)} 
                                    initialValues={this.props.initialRole}
                                    isError={this.props.isError}
                                    errorMessage={this.props.errorMessage}
                                    removePermission={this.removePermission.bind(this)}
                                    deleteRole={this.deleteRole.bind(this)}
                                    selectedPermission={this.props.selectedPermission}
                                    addPermission={this.addPermission.bind(this)}
                                    selectPermission={this.selectPermission.bind(this)}
                                    permissions={this.props.permissions}
                                    onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('roleManagementForm');
    const roleManagement = state.roleManagement;
    return {
        initialRole: roleManagement.initialRole != null ? {
            id: roleManagement.initialRole.id,
            name: roleManagement.initialRole.name,
            organization: roleManagement.initialRole.organization,
            selectedPermissions: roleManagement.initialRole.selectedPermissions
        } : null,
        isError: roleManagement.isError,
        errorMessage: roleManagement.errorMessage,
        permissions: roleManagement.permissions,
        selectedPermission: selector(state, 'selectedPermission')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editRole, loadManagementInitialRole, removePermissionFromRole, selectPermission, addPermission, deleteRole}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(RoleManagementFormContainer);