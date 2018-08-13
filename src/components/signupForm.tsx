import React from 'react'
import {Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
const Button = require('@reperio/ui-components').Button;
const Textbox = require('@reperio/ui-components').Textbox;

const text = (props:any) => {
    const {input, meta, ...rest} = props;
        return (<Textbox {...input} {...rest} />
)};


const SignupForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
        <h2>Sign Up</h2>
        <FormGroup>
            <Field name="firstName" placeholder="First Name" type="text" component={text} />
        </FormGroup>
        <FormGroup>
            <Field name="lastName" placeholder="Last Name" type="text" component={text} />
        </FormGroup>
        <FormGroup>
            <Field name="email" placeholder="Email" type="email" component={text} />
        </FormGroup>
        <FormGroup>
            <Field name="password" placeholder="Password" type="text" component={text} />
        </FormGroup>
        <FormGroup>
            <Field name="confirmPassword" placeholder="Confirm Password" type="password" component={text} />
        </FormGroup>
        <FormGroup>
            {props.children}
        </FormGroup>
        <FormGroup>
            <Button color="neutral" disabled={props.recaptcha !== true} text="Sign Up" />
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'signup' })(SignupForm) as any;