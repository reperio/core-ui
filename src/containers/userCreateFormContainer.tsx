import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserCreateForm from '../components/userCreateForm';
import { State } from '../store/initialState';
import { createUser } from '../actions/usersActions';

class UserCreateFormValues {
    primaryEmail: string;
    firstName: string;
    lastName: string;
    organizations: any[];
}

class UserCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(values: UserCreateFormValues) {
        await this.props.actions.createUser(values.primaryEmail, values.firstName, values.lastName, values.organizations.map((organization:any) => {return organization.value}));
    };

    render() {
        return (
            <div>
                <UserCreateForm onSubmit={this.onSubmit.bind(this)} organizations={this.props.authSession.user.userOrganizations.map((userOrganization:any) => { return userOrganization.organization})} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createUser}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(UserCreateFormContainer);