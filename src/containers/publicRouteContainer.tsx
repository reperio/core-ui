import React, { ComponentType } from 'react';
import {connect} from "react-redux";
import PublicRoute from "../components/routeHelperComponents/publicRoute";
import { RouteComponentProps } from 'react-router';
import { State } from '../store/initialState';

interface OwnProps {
    path: string;
    exact: boolean;
    component: ComponentType<any>;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

class PublicRouteContainer extends React.Component<RouteComponentProps<any> & StateProps & OwnProps> {

    render() {
        return (
            <PublicRoute isAuthenticated={this.props.authSession.isAuthenticated} {...this.props} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps)(PublicRouteContainer) as any;