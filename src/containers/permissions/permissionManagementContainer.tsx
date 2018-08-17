import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PermissionManagement from "../../components/permissions/permissionManagement";
import { getPermissions } from '../../actions/permissionsActions';
import { State } from '../../store/initialState';
import {Redirect} from "react-router";

class PermissionManagementContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getPermissions();
    }

    redirectToEditorCreate() {
        //TODO add redirect
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
        actions: bindActionCreators({getPermissions}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PermissionManagementContainer);