import React from 'react'
import {connect} from "react-redux";
import {submitAuth} from "../actions/authActions";
import {bindActionCreators} from "redux";
import LoginForm from "../components/loginForm";

class LoginFormValues {
    email: string;
    password: string;
}

class LoginFormContainer extends React.Component {
    props: any;

    async onSubmit(values: LoginFormValues) {
        await this.props.actions.submitAuth(values.email, values.password);
    };

    render() {
        return (
            <LoginForm onSubmit={this.onSubmit.bind(this)} authSession={this.props.authSession} />
        );
    }
}

function mapStateToProps(state: any) {
    return {
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({submitAuth}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);