import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Permissions from "../../components/permissions/permissions";
import { getPermissions } from '../../actions/permissionsActions';
import { locationChange } from "../../actions/navActions";
import { State } from '../../store/initialState';
import {Redirect} from "react-router";

class PermissionsContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getPermissions();
    }

    navigateToCreate() {
        this.props.actions.locationChange('/permissions/new');
    }

    navigateToManagement(permissionId: number) {
        this.props.actions.locationChange(`/permissions/${permissionId}/edit`);
    }

    render() {
        return (
            <Permissions navigateToManagement={this.navigateToManagement.bind(this)} navigateToCreate={this.navigateToCreate.bind(this)} gridData={this.props.permissions.permissions} />
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

export default connect(mapStateToProps, mapActionToProps)(PermissionsContainer);