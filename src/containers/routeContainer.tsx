import React, { ComponentType } from 'react';
import {connect} from "react-redux";
import {Redirect, Route, RouteComponentProps} from 'react-router';
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
        if (!this.props.authSession.isAuthenticated) {
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