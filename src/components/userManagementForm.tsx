import React from 'react'
import {Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement, PickerElement } from '@reperio/ui-components';

const UserManagementForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="col-md-9">
            <div className="row">
                <h2>General Information</h2>
                <FormGroup>
                    <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
                </FormGroup>
                <FormGroup>
                    <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
                </FormGroup>
                <FormGroup>
                    <Field name="primaryEmail" placeholder="Primary Email" type="email" component={TextboxElement} />
                </FormGroup>
            </div> 
            <div className="row">
                <h2>Organizations</h2>
                <FormGroup>
                    <Field name="organizations" multi options={props.organizations.map((organization:any) => { return {value: organization.id, label:organization.name}})} placeholder="Organizations" component={PickerElement} />
                </FormGroup>
            </div>
        </div>
        <div className="col-md-3">
            <div className="row">

            </div>
            <div className="row">
                <FormGroup>
                    <ButtonElement type="button" color="cancel" text="Cancel" onClick={() => props.navigateToUsers()} />
                    <ButtonElement type="submit"  color="neutral" text="Save" />
                </FormGroup>
            </div>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userCreate' })(UserManagementForm) as any; 