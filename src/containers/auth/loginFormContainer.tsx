import React from 'react'
import {connect} from "react-redux";
import {submitAuth} from "../../actions/authActions";
import {locationChange} from "../../actions/navActions";
import {bindActionCreators} from "redux";
import LoginForm from "../../components/auth/loginForm";

class LoginFormValues {
    primaryEmailAddress: string;
    password: string;
}

class LoginFormContainer extends React.Component {
    props: any;

    async onSubmit(values: LoginFormValues) {
        await this.props.actions.submitAuth(values.primaryEmailAddress, values.password);
    };

    async navigateToForgotPassword() {
        await this.props.actions.locationChange('/forgotPassword');
    };

    render() {
        return (
            <div>
                <LoginForm onSubmit={this.onSubmit.bind(this)} navigateToForgotPassword={this.navigateToForgotPassword.bind(this)} authSession={this.props.authSession} />
            </div>
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
        actions: bindActionCreators({submitAuth, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(LoginFormContainer);