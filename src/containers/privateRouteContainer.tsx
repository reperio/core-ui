import React, { ComponentType } from 'react';
import {connect} from "react-redux";
import PrivateRoute from "../components/routeHelperComponents/privateRoute";
import { RouteComponentProps } from 'react-router';
import { State } from '../store/initialState';

interface OwnProps {
    path: string;
    exact: boolean;
    component: ComponentType<any>;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

class PrivateRouteContainer extends React.Component<RouteComponentProps<any> & StateProps & OwnProps> {

    render() {
        return (
            <PrivateRoute isAuthenticated={this.props.authSession.isAuthenticated} {...this.props} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps)(PrivateRouteContainer) as any;