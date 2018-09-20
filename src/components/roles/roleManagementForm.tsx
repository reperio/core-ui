import React from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import {TextboxElement, TextareaElement, ButtonElement, Wrapper, PickerElement, CheckboxElement} from '@reperio/ui-components';

const permissionsArray = (props: any) => (
    <div>
        <hr />
        {props.initialValues.map((member:any, index:number) =>
            <div key={index}>
                <div className="row">
                    <div className="col-xs-9">
                        {props.initialValues[index].label}
                    </div>
                    <div className="col-xs-3">
                        <ButtonElement type="button" color="danger" text="Remove" onClick={() => props.removePermissionFromRole(index)} />
                    </div>
                </div>
                <div className="row">
                    <hr />
                </div>
            </div>
        )}
    </div>
);

const RoleManagementForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.isError ? <p className="alert alert-danger">{props.errorMessage}</p> : ""}
        {props.initialValues ? 
            <div className="permission-management-container">
                <div className="permission-management-left">
                    <div className="row permission-management-top">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="profile-name">
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
                                        <h2>Permissions</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <Field  name="selectedPermission"
                                                options={
                                                    props.permissions
                                                        .filter((permission:any) => {
                                                            return !props.initialValues.selectedPermissions.map((x:any)=> x.value).includes(permission.id)
                                                        })
                                                        .map((permission:any, index: number) => { 
                                                            return {
                                                                value: permission.id,
                                                                label:permission.name
                                                            }
                                                        })
                                                }
                                                pickerValue={props.selectedPermission ? props.selectedPermission: ""}
                                                placeholder="Permissions" 
                                                component={PickerElement} 
                                                onChange={props.selectPermission} />
                                    </div>
                                    <div className="col-xs-4">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addPermission(props.selectedPermission)}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FieldArray name="permissions"
                                                    rerenderOnEveryChange={true}
                                                    initialValues={props.initialValues.selectedPermissions}
                                                    removePermissionFromRole={props.removePermissionFromRole}
                                                    component={permissionsArray}/>
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row permission-management-controls-bottom">
                        <Wrapper>
                            <div className="col-xs-12 permission-management-submission-controls-container">
                                <div className="col-xs-6 permission-management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToRoles()} />
                                </div>
                                <div className="col-xs-6 permission-management-submission-controls">
                                    <ButtonElement type="submit"  color="success" wide text="Save" />
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
                <div className="permission-management-right">
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="profile-name">
                                        {props.initialValues.name}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12 permission-management-submission-controls-container">
                                <div className="col-xs-6 permission-management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToRoles()} />
                                </div>
                                <div className="col-xs-6 permission-management-submission-controls">
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
export default reduxForm({ form: 'roleManagementForm', enableReinitialize: true })(RoleManagementForm) as any;
