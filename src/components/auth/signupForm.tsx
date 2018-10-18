import React from 'react'
import {Field, reduxForm, InjectedFormProps } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';
import { StateAuthSession } from '../../store/initialState';

interface SignupProps {
    navigateToLogin(): void;
    onSubmit(): void;
    authSession: StateAuthSession;
    recaptcha: boolean;
    children: any;
}

type Form = SignupProps & InjectedFormProps<any>;

const SignupForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="row">
            <Wrapper>
                <div className="col-xs-12">
                    <div className="row">
                        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
                        <h2>Sign Up</h2>
                        <hr />
                    </div>
                    <div className="row">
                        <FormGroup>
                            <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <Field name="email" placeholder="Email" type="email" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <Field name="password" placeholder="Password" type="password" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <Field name="confirmPassword" placeholder="Confirm Password" type="password" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            {props.children}
                        </FormGroup>
                        <FormGroup>
                            <ButtonElement type="submit" color="neutral" disabled={props.recaptcha !== true} text="Sign Up" />
                        </FormGroup>
                    </div>
                </div>
            </Wrapper>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'signupForm' })(SignupForm) as any;