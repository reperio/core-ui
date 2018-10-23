import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import UserCreateForm from '../../components/users/userCreateForm';
import { State } from '../../store/initialState';
import { createUser } from '../../actions/usersActions';
import { RouteComponentProps } from 'react-router';
import { history } from '../../store/history';
import Dropdown from '../../models/dropdown';
import UserOrganization from '../../models/userOrganization';


class UserCreateFormValues {
    primaryEmailAddress: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    organizations: Dropdown[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class UserCreateFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: UserCreateFormValues) {
        const organizations = form.organizations == ("" || null) 
            ? [] 
            : form.organizations
                .map((organization: Dropdown) => {
                    return organization.value
                });

        await this.props.actions.createUser(form.primaryEmailAddress, form.firstName, form.lastName, form.password, form.confirmPassword, organizations);
    };

    navigateToUsers() {
        history.push('/users');
    }

    render() {
        return (
            <UserCreateForm navigateToUsers={this.navigateToUsers.bind(this)} 
                            onSubmit={this.onSubmit.bind(this)} 
                            organizations={
                                this.props.authSession.user.userOrganizations
                                    .map((userOrganization: UserOrganization) => { 
                                        return userOrganization.organization
                                    })
                            } />
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