import React from 'react'
import {connect} from "react-redux";
import {resetPassword, verifyResetPassword} from "../../actions/authActions";
import {locationChange} from "../../actions/navActions";
import {bindActionCreators} from "redux";
import ResetPasswordForm from "../../components/auth/resetPasswordForm";
import { formValueSelector } from 'redux-form';

class ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

class ResetPasswordFormContainer extends React.Component {
    props: any;

    async onSubmit(form: ResetPasswordFormValues) {
        await this.props.actions.resetPassword(this.props.match.params.token, form.password, form.confirmPassword);
    };

    async componentDidMount () {
        await this.props.actions.verifyResetPassword(this.props.match.params.token);
    };

    navigateToLogin() {
        this.props.actions.locationChange('/login');
    }

    render() {
        return (
            <div>
                {this.props.response == true ?
                    <ResetPasswordForm onSubmit={this.onSubmit.bind(this)} navigateToLogin={this.navigateToLogin.bind(this)} authSession={this.props.authSession} />
                : null}
                {this.props.response == false ?
                    'Link expired'
                : null}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('resetPasswordVerified');
    return {
        response: selector(state, 'response')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({resetPassword, verifyResetPassword, locationChange}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ResetPasswordFormContainer);