import React, { ComponentType } from 'react';
import {connect} from "react-redux";
import {Route, RouteComponentProps} from 'react-router';

import { State } from '../store/initialState';

interface OwnProps {
    path: string;
    exact: boolean;
    component: ComponentType<any>;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}
interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

type Props = RouteComponentProps<any> & StateProps & DispatchProps & OwnProps;

class RouteContainer extends React.Component<Props> {

    render() {
        if (!this.props.authSession.isAuthenticated) {
            return null;
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

function mapActionToProps(dispatch: any) {
    return {
    };
}

export default connect(mapStateToProps, mapActionToProps)(RouteContainer) as any;