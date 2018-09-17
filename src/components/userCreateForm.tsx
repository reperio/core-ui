import React from 'react'
import {Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement, PickerElement, Wrapper } from '@reperio/ui-components';

const UserCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="row">
            <Wrapper>
                <div className="col-md-8 col-xs-12">
                    <div className="row">
                        <h2>User Create</h2>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>First Name</label>
                            <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
                        </div>
                        <div className="col-md-6">
                            <label>Last Name</label>
                            <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Primary Email</label>
                            <Field name="primaryEmail" placeholder="Primary Email" type="email" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Password</label>
                            <Field name="password" placeholder="Password" type="password" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Confirm Password</label>
                            <Field name="confirmPassword" placeholder="Confirm Password" type="password" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Organizations</label>
                            <Field name="organizations" multi options={props.organizations.map((organization:any) => { return {value: organization.id, label:organization.name}})} placeholder="Organizations" component={PickerElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <ButtonElement type="submit"  color="neutral" text="Create User" />
                            <ButtonElement type="button" color="cancel" text="Cancel" onClick={() => props.navigateToUsers()} />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userCreate' })(UserCreateForm) as any; 