import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';

const LoginForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="col-md-12">
            <div className="row">
                <Wrapper>
                    <div className="col-xs-12">
                        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
                        <h2>Login</h2>
                        <hr />
                        <FormGroup>
                            <Field name="primaryEmail" placeholder="Email" type="text" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <Field name="password" placeholder="Password" type="password" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <ButtonElement type="submit" name="signin" color="neutral" text="Sign In" />
                        </FormGroup>
                    </div>
                </Wrapper>
            </div>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'login' })(LoginForm) as any;