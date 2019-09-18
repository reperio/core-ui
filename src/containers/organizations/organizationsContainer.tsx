import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Organizations from "../../components/organizations/organizations";
import { getOrganizationsQuery } from '../../actions/organizationsActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import { Sort, Filter, QueryParameters } from '@reperio/core-connector';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class OrganizationsContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    navigateToCreate() {
        history.push('/organizations/new');
    }

    navigateToManagement(organizationId: string) {
        history.push(`/organizations/${organizationId}/edit`);
    }

    async queryData(page: number, pageSize: number, sort: Sort[], filter: Filter[]) {
        const query: QueryParameters = ({
            page, pageSize, sort, filter
        });
        await this.props.actions.getOrganizationsQuery(query);
        return this.props.organizationsQuery.data;
    }

    render() {
        return (
            <Organizations  navigateToManagement={this.navigateToManagement.bind(this)} 
                            navigateToCreate={this.navigateToCreate.bind(this)} 
                            gridData={this.props.organizations.organizations}
                            onFetchData={this.queryData.bind(this)}
                            pages={this.props.organizationsQuery.pages}  />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        organizations: state.organizations,
        organizationsQuery: state.queryResult
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getOrganizationsQuery}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationsContainer);