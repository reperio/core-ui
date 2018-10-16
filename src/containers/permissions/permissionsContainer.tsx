import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Permissions from "../../components/permissions/permissions";
import { getPermissions } from '../../actions/permissionsActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';

class PermissionsContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getPermissions();
    }

    navigateToCreate() {
        history.push('/permissions/new');
    }

    navigateToManagement(permissionId: string) {
        history.push(`/permissions/${permissionId}/edit`);
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
        actions: bindActionCreators({getPermissions}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PermissionsContainer);