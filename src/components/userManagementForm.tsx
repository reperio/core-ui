import React from 'react'
import {Field, reduxForm, FieldArray } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement, PickerElement, Wrapper } from '@reperio/ui-components';

const organizationsFieldArray = (props: any) => (
    <div>
        <hr />
        {props.initialValues.map((member:any, index:number) =>
            <div key={index}>
                <div className="row">
                    <div className="col-xs-8 user-management-organizations">
                        {props.initialValues[index].label}
                    </div>
                    <div className="col-xs-4">
                        <ButtonElement type="button" color="danger" text="Leave" onClick={() => props.removeOrganization(index)} />
                    </div>
                </div>
                <div className="row">
                    <hr />
                </div>
            </div>
        )}
    </div>
);

const UserManagementForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.initialValues ? 
            <div className="user-management-container">
                <div className="user-management-left">
                    <div className="row user-management-top">
                        <Wrapper>
                            <div className="col-xs-6">
                                <div className="profile-circle">
                                    {props.initialValues.firstName.charAt(0).toUpperCase()}{props.initialValues.lastName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="row">
                                    <div className="profile-name">
                                        {props.initialValues.firstName} {props.initialValues.lastName}
                                    </div>
                                    <div className="profile-primaryEmail">
                                        {props.initialValues.primaryEmail}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>General Information</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <label>First Name</label>
                                        <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
                                    </div>
                                    <div className="col-xs-6">
                                        <label>Last Name</label>
                                        <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Primary Email Address</label>
                                        <Field name="primaryEmail" placeholder="Primary Email" type="email" component={TextboxElement} />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Organizations</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <Field  name="selectedOrganization"
                                                options={
                                                    props.organizations
                                                        .filter((organization:any) => {
                                                            return !props.initialValues.adminOrganizations.map((x:any)=> x.value).includes(organization.id)
                                                        })
                                                        .map((organization:any, index: number) => { 
                                                            return {
                                                                value: organization.id,
                                                                label:organization.name
                                                            }
                                                        })
                                                }
                                                pickerValue={props.selectedOrganization ? props.selectedOrganization: ""}
                                                placeholder="Organizations" 
                                                component={PickerElement} 
                                                onChange={props.selectOrganization} />
                                    </div>
                                    <div className="col-xs-4">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addOrganization(props.selectedOrganization)}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FieldArray name="organizations"
                                                    rerenderOnEveryChange={true}
                                                    initialValues={props.initialValues.adminOrganizations}
                                                    removeOrganization={props.removeOrganization}
                                                    component={organizationsFieldArray}/>
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row user-management-controls-bottom">
                        <Wrapper>
                            <div className="col-xs-12 user-management-submission-controls-container">
                                <div className="col-xs-6 user-management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToUsers()} />
                                </div>
                                <div className="col-xs-6 user-management-submission-controls">
                                    <ButtonElement type="submit"  color="success" wide text="Save" />
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
                <div className="user-management-right">
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-6">
                                <div className="profile-circle">
                                    {props.initialValues.firstName.charAt(0).toUpperCase()}{props.initialValues.lastName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="row">
                                    <div className="profile-name">
                                        {props.initialValues.firstName} {props.initialValues.lastName}
                                    </div>
                                    <div className="profile-primaryEmail">
                                        {props.initialValues.primaryEmail}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12 user-management-submission-controls-container">
                                <div className="col-xs-6 user-management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToUsers()} />
                                </div>
                                <div className="col-xs-6 user-management-submission-controls">
                                    <ButtonElement type="submit"  color="success" wide text="Save" />
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
            </div>
        : null }
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userManagementForm', enableReinitialize: true })(UserManagementForm) as any; 