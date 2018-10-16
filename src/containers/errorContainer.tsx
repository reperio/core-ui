import React from 'react'
import {connect} from "react-redux";
import Error from "../components/error";
import {history} from '../store/history';
import { clearState } from '../actions/errorActions';
import { bindActionCreators } from '../../node_modules/redux';

class ErrorContainer extends React.Component {
    props: any;

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

function mapStateToProps(state: any) {
    return {};
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({clearState}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ErrorContainer);