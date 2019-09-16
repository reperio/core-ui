import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Roles from "../../components/roles/roles";
import { getRoles, getRolesQuery } from '../../actions/rolesActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import { Sort, Filter, QueryParameters } from '@reperio/core-connector';

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

    async queryData(page: number, pageSize: number, sort: Sort[], filter: Filter[]) {
        const query: QueryParameters = ({
            page, pageSize, sort, filter
        });
        await this.props.actions.getRolesQuery(query);
        return this.props.rolesQuery.data;
    }

    render() {
        return (
            <Roles  navigateToManagement={this.navigateToManagement.bind(this)} 
                    navigateToCreate={this.navigateToCreate.bind(this)} 
                    gridData={this.props.roles.roles}
                    onFetchData={this.queryData.bind(this)}
                    pages={this.props.rolesQuery.pages}  />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        roles: state.roles,
        rolesQuery: state.queryResult
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getRoles, getRolesQuery}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(RolesContainer);