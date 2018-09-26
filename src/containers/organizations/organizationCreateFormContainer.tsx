import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import OrganizationCreateForm from '../../components/organizations/organizationCreateForm';
import { State } from '../../store/initialState';
import { createOrganization } from '../../actions/organizationsActions';
import { getUsers } from '../../actions/usersActions';
import { locationChange } from '../../actions/navActions';

class OrganizationCreateFormValues {
    name: string;
    selectedUsers: any;
}

class OrganizationCreateFormContainer extends React.Component {
    props: any;

    async onSubmit(form: OrganizationCreateFormValues) {
        await this.props.actions.createOrganization(form.name, form.selectedUsers);
    };

    async componentDidMount() {
        await this.props.actions.getUsers();
    }

    async navigateToOrganizations() {
        this.props.actions.locationChange('/organizations', null, null);
    }

    render() {
        return (
            <div>
                <OrganizationCreateForm navigateToOrganizations={this.navigateToOrganizations.bind(this)} 
                                        users={this.props.users}
                                        onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        users: state.users.users
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createOrganization, locationChange, getUsers}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationCreateFormContainer);