import React from 'react'
import {Field, reduxForm, InjectedFormProps } from 'redux-form'
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
                <div className="r-wrapper-child ">
                {props.authSession.isError ?
                    <div className="row">
                        <div className="r-row-child">
                            <p className="alert alert-danger">{props.authSession.errorMessage}</p>
                        </div>
                    </div>              
                : null}
                    <div className="row">
                        <div className="r-row-child">
                            <h2>Sign Up</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="r-row-child">
                            <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="r-row-child">
                            <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="r-row-child">
                            <Field name="email" placeholder="Email" type="email" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="r-row-child">
                            <Field name="password" placeholder="Password" type="password" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="r-row-child">
                            <Field name="confirmPassword" placeholder="Confirm Password" type="password" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="r-row-child">
                            {props.children}
                        </div>
                    </div>
                    <div className="row">
                        <div className="r-row-child">
                            <ButtonElement type="submit" color="neutral" disabled={props.recaptcha !== true} text="Sign Up" />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'signupForm' })(SignupForm) as any;