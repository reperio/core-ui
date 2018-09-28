import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';

const ForgotPasswordForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="row">
            <Wrapper>
                <div className="col-xs-12 col-md-8">
                    <div className="row">
                        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
                        <h2>Forgot password</h2>
                        <hr />
                    </div>
                    <div className="row">
                        <FormGroup>
                            <Field name="primaryEmailAddress" placeholder="Primary Email" type="text" component={TextboxElement} />
                        </FormGroup>
                        <FormGroup>
                            <ButtonElement type="submit" name="reset" color="neutral" text="Reset Now" />
                            <ButtonElement type="button" name="cancel" color="danger" text="Cancel" onClick={() => props.navigateToLogin()} />
                        </FormGroup>
                    </div>
                </div>
            </Wrapper>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'forgotPasswordForm' })(ForgotPasswordForm) as any;