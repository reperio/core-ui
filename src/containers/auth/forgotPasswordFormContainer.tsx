import React from 'react'
import {connect} from "react-redux";
import {forgotPassword} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import ForgotPasswordForm from "../../components/auth/forgotPasswordForm";
import { history } from '../../store/history';

class ForgotPasswordFormValues {
    primaryEmailAddress: string;
}

class ForgotPasswordFormContainer extends React.Component {
    props: any;

    async onSubmit(values: ForgotPasswordFormValues) {
        await this.props.actions.forgotPassword(values.primaryEmailAddress);
    };

    navigateToLogin() {
        history.push('/login');
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
        actions: bindActionCreators({forgotPassword}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ForgotPasswordFormContainer);