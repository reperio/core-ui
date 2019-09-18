import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Users from "../../components/users/users";
import { getUsersQuery } from '../../actions/usersActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import { Sort, Filter, QueryParameters } from '@reperio/core-connector';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class UsersContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    navigateToUserCreate() {
        history.push('/users/new');
    }

    navigateToManagement(userId: string) {
        history.push(`users/${userId}/edit`);
    }

    async queryData(page: number, pageSize: number, sort: Sort[], filter: Filter[]) {
        const query: QueryParameters = ({
            page, pageSize, sort, filter
        });
        await this.props.actions.getUsersQuery(query);
        return this.props.usersQuery.data;
    }

    render() {
        return (
            <Users  gridData={this.props.users.users} 
                    navigateToManagement={this.navigateToManagement.bind(this)} 
                    navigateToUserCreate={this.navigateToUserCreate.bind(this)}
                    onFetchData={this.queryData.bind(this)}
                    pages={this.props.usersQuery.pages} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        users: state.users,
        usersQuery: state.queryResult
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getUsersQuery}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UsersContainer);