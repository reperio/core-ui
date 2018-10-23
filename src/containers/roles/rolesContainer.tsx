import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Roles from "../../components/roles/roles";
import { getRoles } from '../../actions/rolesActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class RolesContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async componentDidMount() {
        await this.props.actions.getRoles();
    }

    navigateToCreate() {
        history.push('/roles/new');
    }

    navigateToManagement(roleId: string) {
        history.push(`/roles/${roleId}/edit`);
    }

    render() {
        return (
            <Roles  navigateToManagement={this.navigateToManagement.bind(this)} 
                    navigateToCreate={this.navigateToCreate.bind(this)} 
                    gridData={this.props.roles.roles} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        roles: state.roles
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getRoles}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(RolesContainer);