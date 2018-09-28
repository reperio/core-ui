import React from 'react'
import {connect} from "react-redux";
import {forgotPassword} from "../../actions/authActions";
import {locationChange} from "../../actions/navActions";
import {bindActionCreators} from "redux";
import ForgotPasswordForm from "../../components/auth/forgotPasswordForm";

class LoginFormValues {
    primaryEmailAddress: string;
}

class ForgotPasswordFormContainer extends React.Component {
    props: any;

    async onSubmit(values: LoginFormValues) {
        await this.props.actions.forgotPassword(values.primaryEmailAddress);
    };

    navigateToLogin() {
        this.props.actions.locationChange('/login');
    }

    render() {
        return (
            <div>
                <ForgotPasswordForm onSubmit={this.onSubmit.bind(this)} navigateToLogin={this.navigateToLogin.bind(this)} authSession={this.props.authSession} />
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
        actions: bindActionCreators({forgotPassword, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ForgotPasswordFormContainer);