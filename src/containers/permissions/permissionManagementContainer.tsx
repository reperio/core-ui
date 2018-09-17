import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { State } from '../../store/initialState';
import { loadManagementInitialPermission, editPermission, clearManagementInitialPermission } from '../../actions/permissionsActions';
import { locationChange } from '../../actions/navActions';
import PermissionManagementForm from '../../components/permissions/permissionManagementForm';
import { formValueSelector, change } from 'redux-form';

class UserManagementFormValues {
    id: number;
    displayName: string;
    description: string;
    isSystemAdminPermission: boolean;
    name: string;
}

class PermissionManagementFormContainer extends React.Component {
    props: any;

    async onSubmit(form: UserManagementFormValues) {
        await this.props.actions.editPermission(form.id, form.displayName, form.name, form.description, form.isSystemAdminPermission);
    };

    async componentDidMount() {
        this.props.actions.clearManagementInitialPermission();
        await this.props.actions.loadManagementInitialPermission(this.props.match.params.permissionId);
    }

    navigateToPermissions() {
        this.props.actions.locationChange('/permissions', null, null);
    }

    render() {
        return (
            <div>
                <PermissionManagementForm   navigateToPermissions={this.navigateToPermissions.bind(this)} 
                                            initialValues={this.props.initialPermission}
                                            isError={this.props.isError}
                                            errorMessage={this.props.errorMessage}
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
            roles: permissionManagement.initialPermission.rolePermissions
        } : null,
        isError: permissionManagement.isError,
        errorMessage: permissionManagement.errorMessage,
        authSession: state.authSession,
        selectedOrganization: selector(state, 'selectedOrganization')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({editPermission, locationChange, loadManagementInitialPermission, clearManagementInitialPermission}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PermissionManagementFormContainer);