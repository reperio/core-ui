import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Permissions from "../../components/permissions/permissions";
import { getPermissionsQuery } from '../../actions/permissionsActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import { Sort, Filter, QueryParameters } from '@reperio/core-connector';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class PermissionsContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    navigateToManagement(permissionName: string) {
        history.push(`/permissions/${permissionName}/edit`);
    }
    
    async queryData(page: number, pageSize: number, sort: Sort[], filter: Filter[]) {
        const query: QueryParameters = ({
            page, pageSize, sort, filter
        });
        await this.props.actions.getPermissionsQuery(query);
        return this.props.permissionsQuery.data;
    }

    render() {
        return (
            <Permissions    navigateToManagement={this.navigateToManagement.bind(this)}
                            gridData={this.props.permissionsQuery.data}
                            onFetchData={this.queryData.bind(this)}
                            pages={this.props.permissionsQuery.pages}  />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        permissions: state.permissions,
        permissionsQuery: state.queryResult
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getPermissionsQuery}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PermissionsContainer);