import React, { ComponentType } from 'react';
import {connect} from "react-redux";
import {Route, RouteComponentProps} from 'react-router';
import queryString from 'query-string';

import { State } from '../store/initialState';
import RedirectToLogin from "../components/redirectToLogin";

interface OwnProps {
    path: string;
    exact: boolean;
    component: ComponentType<any>;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

class RouteContainer extends React.Component<RouteComponentProps<any> & StateProps & OwnProps> {

    render() {
        const queryParams = queryString.parse(this.props.location.search);

        if (queryParams.otp != null) {
            console.log("received otp", queryParams.otp);
            return null;
        } else if (!this.props.authSession.isAuthenticated) {
            return (<RedirectToLogin />);
        } else {
            return (<Route {...this.props} />);
        }
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps)(RouteContainer) as any;