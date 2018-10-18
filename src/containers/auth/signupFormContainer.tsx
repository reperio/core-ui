import React from 'react'
import {connect} from "react-redux";
import {signup, recaptcha} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import SignupForm from '../../components/auth/signupForm';
import { State } from '../../store/initialState';
import { formValueSelector } from 'redux-form';
import { RouteComponentProps } from 'react-router';
var ReCAPTCHA = require("react-google-recaptcha").default;

class SignupFormValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class SignupFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(values: SignupFormValues) {
        await this.props.actions.signup(values.email, values.firstName, values.lastName, values.password, values.confirmPassword);
    };

    async onChange(value: any) {
        this.props.actions.recaptcha(value);
    }

    render() {
        return (
            <div>
                <SignupForm onSubmit={this.onSubmit.bind(this)} 
                            authSession={this.props.authSession} 
                            recaptcha={this.props.recaptcha}>
                    <ReCAPTCHA
                        ref="recaptcha"
                        sitekey="6LfjumIUAAAAAMbk65jFCXIkLsGiby092A6d2_Vv"
                        onChange={this.onChange.bind(this)}
                    />
                </SignupForm>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('signupForm');
    return {
        authSession: state.authSession,
        recaptcha: selector(state, 'recaptcha')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({signup, recaptcha}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(SignupFormContainer);