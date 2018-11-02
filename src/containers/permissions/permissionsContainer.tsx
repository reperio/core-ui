import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Permissions from "../../components/permissions/permissions";
import { getPermissions } from '../../actions/permissionsActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class PermissionsContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async componentDidMount() {
        await this.props.actions.getPermissions();
    }

    navigateToManagement(permissionName: string) {
        history.push(`/permissions/${permissionName}/edit`);
    }

    render() {
        return (
            <Permissions    navigateToManagement={this.navigateToManagement.bind(this)}
                            gridData={this.props.permissions.permissions} />
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