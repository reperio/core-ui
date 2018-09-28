import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';

const LoginForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="row">
            <Wrapper>
                <div className="col-xs-12 col-md-8">
                    <div className="row">
                        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
                        <h2>Login</h2>
                        <hr />
                    </div>
                    <div className="row">
                        <FormGroup>
                            <Field name="primaryEmailAddress" placeholder="Email" type="text" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <Field name="password" placeholder="Password" type="password" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <ButtonElement type="submit" name="signin" color="success" text="Sign In" />
                            <ButtonElement type="button" color="neutral" text="Forgot Password" onClick={() => props.navigateToForgotPassword()} />
                        </FormGroup>
                    </div>
                </div>
            </Wrapper>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'loginForm' })(LoginForm) as any;