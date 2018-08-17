import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PermissionManagement from "../../components/permissions/permissionManagement";
import { getPermissions } from '../../actions/permissionsActions';
import { locationChange } from "../../actions/navActions";
import { State } from '../../store/initialState';
import {Redirect} from "react-router";

class PermissionManagementContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getPermissions();
    }

    redirectToEditorCreate() {
        this.props.actions.locationChange('/permissions/new');
    }

    render() {
        return (
            <PermissionManagement redirectToEditorCreate={this.redirectToEditorCreate.bind(this)} gridData={this.props.permissions.permissions} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        permissions: state.permissions
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getPermissions, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PermissionManagementContainer);