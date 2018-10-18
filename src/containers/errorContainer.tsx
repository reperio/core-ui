import React from 'react'
import {connect} from "react-redux";
import Error from "../components/error";
import {history} from '../store/history';
import { clearState } from '../actions/errorActions';
import { bindActionCreators } from '../../node_modules/redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../store/initialState';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class ErrorContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    goHome() {
        history.push('/')
    }

    async componentWillUnmount() {
        this.props.actions.clearState();
    }

    render() {
        return (
            <div>
                <Error goHome={this.goHome.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {};
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({clearState}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ErrorContainer);