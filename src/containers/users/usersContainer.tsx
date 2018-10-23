import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Users from "../../components/users/users";
import { getUsers } from '../../actions/usersActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class UsersContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async componentDidMount() {
        await this.props.actions.getUsers();
    }

    navigateToUserCreate() {
        history.push('/users/new');
    }

    navigateToManagement(userId: string) {
        history.push(`users/${userId}/edit`);
    }

    render() {
        return (
            <Users  gridData={this.props.users.users} 
                    navigateToManagement={this.navigateToManagement.bind(this)} 
                    navigateToUserCreate={this.navigateToUserCreate.bind(this)} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        users: state.users
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getUsers}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UsersContainer);