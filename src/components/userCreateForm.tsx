import React from 'react'
import {Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement, PickerElement } from '@reperio/ui-components';

const UserCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <h2>User Create</h2>
        <FormGroup>
            <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
        </FormGroup>
        <FormGroup>
            <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
        </FormGroup>
        <FormGroup>
            <Field name="primaryEmail" placeholder="Primary Email" type="email" component={TextboxElement} />
        </FormGroup>
        <FormGroup>
            <Field name="password" placeholder="Password" type="password" component={TextboxElement} />
        </FormGroup>
        <FormGroup>
            <Field name="confirmPassword" placeholder="Confirm Password" type="password" component={TextboxElement} />
        </FormGroup>
        <FormGroup>
            <Field name="organizations" multi options={props.organizations.map((organization:any) => { return {value: organization.id, label:organization.name}})} placeholder="Organizations" component={PickerElement} />
        </FormGroup>
        <FormGroup>
            <ButtonElement type="submit"  color="neutral" text="Create User" />
            <ButtonElement type="button" color="cancel" text="Cancel" onClick={() => props.navigateToUserManagement()} />
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userCreate' })(UserCreateForm) as any; 