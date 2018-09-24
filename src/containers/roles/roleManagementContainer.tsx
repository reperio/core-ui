import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { editRole, loadManagementInitialRole, clearManagementInitialRole, removePermissionFromRole, selectPermission, addPermission, deleteRole} from '../../actions/rolesActions';
import { locationChange } from '../../actions/navActions';
import RoleManagementForm from '../../components/roles/roleManagementForm';
import { formValueSelector, change } from 'redux-form';

class RoleManagementFormValues {
    id: number;
    name: string;
    selectedPermissions: any[];
}

class RoleManagementFormContainer extends React.Component {
    props: any;

    async onSubmit(form: RoleManagementFormValues) {
        await this.props.actions.editRole(form.id, form.name, form.selectedPermissions.map((permission:any) => {return permission.value}));
    };

    async componentDidMount() {
        this.props.actions.clearManagementInitialRole();
        await this.props.actions.loadManagementInitialRole(this.props.match.params.roleId);
    }

    navigateToRoles() {
        this.props.actions.locationChange('/roles', null, null);
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
        authSession: state.authSession,
        permissions: roleManagement.permissions,
        selectedPermission: selector(state, 'selectedPermission')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({locationChange, editRole, loadManagementInitialRole, clearManagementInitialRole, removePermissionFromRole, selectPermission, addPermission, deleteRole}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(RoleManagementFormContainer);