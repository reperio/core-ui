import React, { ComponentType } from 'react';
import {connect} from "react-redux";
import {Route, RouteComponentProps, Redirect} from 'react-router';

import { State } from '../store/initialState';

interface OwnProps {
    path: string;
    exact: boolean;
    component: ComponentType<any>;
    requiredPermissions?: string[];
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}
interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

type Props = RouteComponentProps<any> & StateProps & DispatchProps & OwnProps;

class RouteContainer extends React.Component<Props> {

    hasPermission() {
        return this.props.requiredPermissions ? this.props.requiredPermissions.every(val => this.props.authSession.user.permissions.includes(val)) : null;
    }

    render() {
        const hasPermission = this.hasPermission();
        if (!this.props.authSession.isAuthenticated) {
            return null;
        } else if (hasPermission != null && !hasPermission) {
            return (<Redirect to="error" />);
        }else {
            return (<Route {...this.props} />);
        }
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
    };
}

export default connect(mapStateToProps, mapActionToProps)(RouteContainer) as any;