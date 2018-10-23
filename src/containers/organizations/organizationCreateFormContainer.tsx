import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import OrganizationCreateForm from '../../components/organizations/organizationCreateForm';
import { State } from '../../store/initialState';
import { createOrganization } from '../../actions/organizationsActions';
import { getUsers } from '../../actions/usersActions';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import Dropdown from '../../models/dropdown';

class OrganizationCreateFormValues {
    name: string;
    selectedUsers: Dropdown[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class OrganizationCreateFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: OrganizationCreateFormValues) {
        await this.props.actions.createOrganization(form.name, form.selectedUsers);
    };

    async componentDidMount() {
        await this.props.actions.getUsers();
    }

    async navigateToOrganizations() {
        history.push('/organizations');
    }

    render() {
        return (
            <OrganizationCreateForm navigateToOrganizations={this.navigateToOrganizations.bind(this)} 
                                    users={this.props.users}
                                    onSubmit={this.onSubmit.bind(this)} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        users: state.users.users
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({createOrganization, getUsers}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(OrganizationCreateFormContainer);