import React from 'react'
import {connect} from "react-redux";
import {resetPassword, verifyResetPassword} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import ResetPasswordForm from "../../components/auth/resetPasswordForm";
import { formValueSelector } from 'redux-form';
import { history } from '../../store/history';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store/initialState';

class ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class ResetPasswordFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(form: ResetPasswordFormValues) {
        await this.props.actions.resetPassword(this.props.match.params.token, form.password, form.confirmPassword);
    };

    async componentDidMount () {
        await this.props.actions.verifyResetPassword(this.props.match.params.token);
    };

    navigateToLogin() {
        history.push('/login');
    }

    render() {
        return (
            <ResetPasswordForm  onSubmit={this.onSubmit.bind(this)} 
                                navigateToLogin={this.navigateToLogin.bind(this)}
                                response={this.props.response} />
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('resetPasswordVerified');
    return {
        response: selector(state, 'response') as boolean
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({resetPassword, verifyResetPassword}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ResetPasswordFormContainer);