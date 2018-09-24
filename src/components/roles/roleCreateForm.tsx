import React from 'react'
import {Field, reduxForm, FieldArray} from 'redux-form'
import { TextboxElement, ButtonElement, PickerElement, Wrapper } from '@reperio/ui-components';
import PermissionsArray from '../permissions/permissionsArray';

const RoleCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="row">
            <Wrapper>
                <div className="col-md-8 col-xs-12">
                    <div className="row">
                        <h2>Role Create</h2>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Name</label>
                            <Field name="name" placeholder="First Name" type="text" component={TextboxElement} />
                        </div>
                        <div className="col-md-6">
                            <label>Application</label>
                            <Field  name="selectedApplication"
                                    placeholder="Application"
                                    options={
                                        props.applications
                                            .map((application:any, index: number) => { 
                                                return {
                                                    value: application.id,
                                                    label: application.name
                                                }
                                            })
                                    }
                                    component={PickerElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <label>Organization</label>
                            <Field  name="selectedOrganization"
                                    placeholder="Organization"
                                    options={
                                        props.organizations
                                            .map((organization:any, index: number) => { 
                                                return {
                                                    value: organization.id,
                                                    label: organization.name
                                                }
                                            })
                                    }
                                    component={PickerElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Permissions</label>
                            <Field  name="selectedPermissions"
                                    multi
                                    placeholder="Permissions"
                                    options={
                                        props.permissions
                                            .map((permission:any, index: number) => { 
                                                return {
                                                    value: permission.id,
                                                    label: permission.name
                                                }
                                            })
                                    }
                                    component={PickerElement}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <ButtonElement type="submit"  color="neutral" text="Create Role" />
                            <ButtonElement type="button" color="cancel" text="Cancel" onClick={() => props.navigateToRoles()} />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'roleCreateForm' })(RoleCreateForm) as any; 