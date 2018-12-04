import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { editRole, loadManagementInitialRole, removePermissionFromRole, selectPermission, addPermission, deleteRole} from '../../actions/rolesActions';
import { getPermissions } from '../../actions/permissionsActions';
import RoleManagementForm from '../../components/roles/roleManagementForm';
import { formValueSelector } from 'redux-form';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import Dropdown from '../../models/dropdown';
import { CorePermissions } from '../../models/permission';

class RoleManagementFormValues {
    name: string;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class RoleManagementFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: RoleManagementFormValues) {
        await this.props.actions.editRole(this.props.initialRole.role.id, form.name, this.props.initialRole.selectedPermissions.map(x=> x.name));
    };

    async componentDidMount() {
        await this.props.actions.getPermissions();
        await this.props.actions.loadManagementInitialRole(this.props.match.params.roleId);
    }

    navigateToRoles() {
        history.push('/roles');
    }

    removePermission(index: number){
        this.props.actions.removePermissionFromRole(index);
    }

    selectPermission(permission: Dropdown) {
        this.props.actions.selectPermission(permission);
    }

    addPermission(permission: Dropdown) {
        this.props.actions.addPermission(permission);
    }

    deleteRole(roleId: string) {
        this.props.actions.deleteRole(roleId);
    }

    render() {
        return (
            <RoleManagementForm navigateToRoles={this.navigateToRoles.bind(this)}
                                canUpdateRoles={this.props.authSession.user.permissions.includes(CorePermissions.UpdateRoles)}
                                canDeleteRoles={this.props.authSession.user.permissions.includes(CorePermissions.DeleteRoles)}
                                initialValues={this.props.initialRole ? this.props.initialRole.role : null}
                                selectedPermissions={this.props.initialRole ? this.props.initialRole.selectedPermissions : null}
                                isError={this.props.isError}
                                errorMessage={this.props.errorMessage}
                                removePermission={this.removePermission.bind(this)}
                                deleteRole={this.deleteRole.bind(this)}
                                selectedPermission={this.props.selectedPermission}
                                addPermission={this.addPermission.bind(this)}
                                selectPermission={this.selectPermission.bind(this)}
                                permissions={this.props.permissions}
                                onSubmit={this.onSubmit.bind(this)} />
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('roleManagementForm');
    return {
        initialRole: state.roleManagement.initialRole,
        isError: state.roleManagement.isError,
        errorMessage: state.roleManagement.errorMessage,
        permissions: state.permissions.permissions,
        selectedPermission: selector(state, 'selectedPermission') as Dropdown,
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editRole, loadManagementInitialRole, removePermissionFromRole, selectPermission, addPermission, deleteRole, getPermissions}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(RoleManagementFormContainer);