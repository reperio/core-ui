import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement } from '@reperio/ui-components';

const LoginForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
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
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'login' })(LoginForm) as any;