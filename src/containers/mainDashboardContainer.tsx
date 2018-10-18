import React from 'react'
import {connect} from "react-redux";
import MainDashboard from "../components/mainDashboard";
import { RouteComponentProps } from 'react-router';
import { State } from '../store/initialState';
import { bindActionCreators } from '../../node_modules/redux';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class MainDashboardContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {
    render() {
        return (
            <div>
                <MainDashboard authSession={this.props.authSession} />
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
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(MainDashboardContainer);