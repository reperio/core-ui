import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {TextboxElement, ButtonElement, Wrapper, PickerElement} from '@reperio/ui-components';
import OrganizationManagementUsers from './organizationManagementUsers';

const OrganizationManagementForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.isError ? <p className="alert alert-danger">{props.errorMessage}</p> : ""}
        {props.initialValues ? 
            <div className="management-container">
                <div className="management-left">
                    <div className="row management-top">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="management-name">
                                        {props.initialValues.name}
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
                                    <div className="col-md-12">
                                        <label>Name</label>
                                        <Field name="name" placeholder="Name" type="text" component={TextboxElement} />
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
                                        <h2>Users</h2>
                                        <hr />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <Field  name="selectedUser"
                                                options={
                                                    props.users
                                                        .filter((user:any) => {
                                                            return !props.initialValues.selectedUsers.map((x:any)=> x.value).includes(user.id)
                                                        })
                                                        .map((user:any, index: number) => { 
                                                            return {
                                                                value: user.id,
                                                                label: `${user.firstName} ${user.lastName} - ${user.primaryEmailAddress}`
                                                            }
                                                        })
                                                }
                                                pickerValue={props.selectedUser ? props.selectedUser: ""}
                                                placeholder="Users" 
                                                component={PickerElement} 
                                                onChange={props.selectUser} />
                                    </div>
                                    <div className="col-xs-4">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addUser(props.selectedUser)}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <OrganizationManagementUsers    gridData={                                            
                                                                            props.users
                                                                                .filter((user:any) => {
                                                                                    return props.initialValues.selectedUsers.map((x:any)=> x.value).includes(user.id)
                                                                                })}
                                                                        removeUser={props.removeUser} />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="col-xs-12 management-submission-controls-container">
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToOrganizations()} />
                                </div>
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteOrganization(props.initialValues.id)} />
                                </div>
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="submit"  color="success" wide text="Save" />
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
                <div className="management-right">
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="management-name">
                                        {props.initialValues.name}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12 management-submission-controls-container">
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToOrganizations()} />
                                </div>
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteOrganization(props.initialValues.id)} />
                                </div>
                                <div className="col-xs-4 management-submission-controls">
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
export default reduxForm({ form: 'organizationManagementForm', enableReinitialize: true })(OrganizationManagementForm) as any;
