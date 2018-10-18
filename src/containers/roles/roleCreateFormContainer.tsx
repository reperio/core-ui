import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import RoleCreateForm from '../../components/roles/roleCreateForm';
import { State } from '../../store/initialState';
import { createRole } from '../../actions/rolesActions';
import { getOrganizations } from '../../actions/organizationsActions';
import { getApplications } from '../../actions/applicationsActions';
import { getPermissions } from '../../actions/permissionsActions';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import Dropdown from '../../models/dropdown';

class RoleCreateFormValues {
    name: string;
    selectedApplication: Dropdown;
    selectedOrganization: Dropdown;
    selectedPermissions: Dropdown[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class RoleCreateFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: RoleCreateFormValues) {
        await this.props.actions.createRole(form.name, form.selectedApplication, form.selectedOrganization, form.selectedPermissions);
    };

    async componentDidMount() {
        await this.props.actions.getOrganizations();
        await this.props.actions.getApplications();
        await this.props.actions.getPermissions();
    }

    async navigateToRoles() {
        history.push('/roles');
    }

    render() {
        return (
            <div>
                <RoleCreateForm navigateToRoles={this.navigateToRoles.bind(this)} 
                                applications={this.props.applications} 
                                organizations={this.props.organizations}
                                permissions={this.props.permissions}
                                onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        organizations: state.organizations.organizations,
        applications: state.applications.applications,
        permissions: state.permissions.permissions
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createRole, getOrganizations, getApplications, getPermissions}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(RoleCreateFormContainer);