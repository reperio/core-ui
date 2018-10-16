import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Organizations from "../../components/organizations/organizations";
import { getOrganizations } from '../../actions/organizationsActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';

class OrganizationsContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getOrganizations();
    }

    navigateToCreate() {
        history.push('/organizations/new');
    }

    navigateToManagement(organizationId: string) {
        history.push(`/organizations/${organizationId}/edit`);
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
        actions: bindActionCreators({getOrganizations}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationsContainer);