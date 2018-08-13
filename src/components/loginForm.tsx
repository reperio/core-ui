import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
const Button = require('@reperio/ui-components').Button;
const Textbox = require('@reperio/ui-components').Textbox;
const Checkbox = require('@reperio/ui-components').Checkbox;

const text = (props:any) => {
    const {input, meta, ...rest} = props;
        return (<Textbox {...input} {...rest} />
)};

// const test2 = (props:any) => {
//         return (<Checkbox label={...props.label} checked={...props.input.value} {...props.input} />
// )};

const handleCheckboxChange = (event: any) => {
    this.setState({checked: event.target.checked});
}

const LoginForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.authSession.isError ? <p className="alert alert-danger">{props.authSession.errorMessage}</p> : ""}
        <h2>Login</h2>
        <hr />
        <FormGroup>
            <Field name="email" placeholder="Email" type="text" component={text} />
        </FormGroup>
        <FormGroup>
            <Field name="password" placeholder="Password" type="password" component={text} />
        </FormGroup>
        <FormGroup>
            <Button color="neutral" text="Sign In" />
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'login' })(LoginForm) as any;