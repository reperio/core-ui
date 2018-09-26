import React from 'react'
import {Field, reduxForm} from 'redux-form'
import { TextboxElement, ButtonElement, PickerElement, Wrapper } from '@reperio/ui-components';

const OrganizationCreateForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <div className="row">
            <Wrapper>
                <div className="col-md-8 col-xs-12">
                    <div className="row">
                        <h2>Organization Create</h2>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Name</label>
                            <Field name="name" placeholder="First Name" type="text" component={TextboxElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Users</label>
                            <Field  name="selectedUsers"
                                    placeholder="Users"
                                    options={
                                        props.users
                                            .map((user:any, index: number) => { 
                                                return {
                                                    value: user.id,
                                                    label: `${user.firstName} ${user.lastName} - ${user.primaryEmail}`
                                                }
                                            })
                                    }
                                    multi
                                    component={PickerElement} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <ButtonElement type="submit"  color="neutral" text="Create Organization" />
                            <ButtonElement type="button" color="cancel" text="Cancel" onClick={() => props.navigateToOrganizations()} />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'organizationCreateForm' })(OrganizationCreateForm) as any; 