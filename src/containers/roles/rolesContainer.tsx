import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Roles from "../../components/roles/roles";
import { getRoles } from '../../actions/rolesActions';
import { locationChange } from "../../actions/navActions";
import { State } from '../../store/initialState';
import {Redirect} from "react-router";

class RolesContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getRoles();
    }

    navigateToCreate() {
        this.props.actions.locationChange('/roles/new');
    }

    navigateToManagement(roleId: number) {
        this.props.actions.locationChange(`/roles/${roleId}/edit`);
    }

    render() {
        return (
            <Roles navigateToManagement={this.navigateToManagement.bind(this)} navigateToCreate={this.navigateToCreate.bind(this)} gridData={this.props.roles.roles} />
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
        actions: bindActionCreators({getRoles, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(RolesContainer);