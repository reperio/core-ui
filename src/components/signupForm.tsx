import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { AnyMxRecord } from 'dns';

const SignupForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
        <h2>Sign Up</h2>
        <FormGroup>
            <Field name="firstName" component="input" className="form-control" type="text" placeholder="First Name"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="lastName" component="input" className="form-control" type="text" placeholder="Last Name"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="email" component="input" className="form-control" type="text" placeholder="Email"
                   style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="password" component="input" className="form-control" type="password"
                   placeholder="Password" style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            <Field name="confirmPassword" component="input" className="form-control" type="password"
                   placeholder="Confirm Password" style={{maxWidth: "280px"}}/>
        </FormGroup>
        <FormGroup>
            {props.children}
        </FormGroup>
        <FormGroup>
            <button disabled={props.recaptcha !== true} className="btn btn-primary" type="submit">Sign up</button>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'signup' })(SignupForm) as any;