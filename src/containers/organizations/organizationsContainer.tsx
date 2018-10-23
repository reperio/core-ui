import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Organizations from "../../components/organizations/organizations";
import { getOrganizations } from '../../actions/organizationsActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class OrganizationsContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

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
            <Organizations  navigateToManagement={this.navigateToManagement.bind(this)} 
                            navigateToCreate={this.navigateToCreate.bind(this)} 
                            gridData={this.props.organizations.organizations} />
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