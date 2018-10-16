import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Users from "../../components/users/users";
import { getUsers, populateUserOrganizations } from '../../actions/usersActions';
import { State } from '../../store/initialState';
import { history } from '../../store/history';

class UsersContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getUsers();
    }

    navigateToUserCreate() {
        history.push('/users/new');
    }

    navigateToManagement(userId: any) {
        history.push(`users/${userId}/edit`);
    }

    render() {
        return (
            <div>
                <Users  gridData={this.props.users.users} 
                        navigateToManagement={this.navigateToManagement.bind(this)} 
                        navigateToUserCreate={this.navigateToUserCreate.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        users: state.users
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getUsers, populateUserOrganizations}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UsersContainer);