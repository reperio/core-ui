import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Organizations from "../../components/organizations/organizations";
import { getOrganizations } from '../../actions/organizationsActions';
import { locationChange } from "../../actions/navActions";
import { State } from '../../store/initialState';

class OrganizationsContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getOrganizations();
    }

    navigateToCreate() {
        this.props.actions.locationChange('/organizations/new');
    }

    navigateToManagement(organizationId: number) {
        this.props.actions.locationChange(`/organizations/${organizationId}/edit`);
    }

    render() {
        return (
            <Organizations navigateToManagement={this.navigateToManagement.bind(this)} navigateToCreate={this.navigateToCreate.bind(this)} gridData={this.props.organizations.organizations} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        organizations: state.organizations
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getOrganizations, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationsContainer);