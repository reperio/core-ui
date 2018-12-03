import React from 'react'
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import { TextboxElement, ButtonElement, PickerElement, Wrapper } from '@reperio/ui-components';
import Application from '../../models/application';
import Organization from '../../models/organization';
import { Permission } from '../../models/permission';

interface OrganizationCreateProps {
    navigateToRoles(): void;
    onSubmit(): void;
    applications: Application[];
    organizations: Organization[];
    permissions: Permission[];
}

type Form = OrganizationCreateProps & InjectedFormProps<any>;

const RoleCreateForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Wrapper>
            <div className="r-wrapper-child">
                <div className="row">
                    <div className="r-row-child">
                        <h2>Role Create</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                            <label>Name</label>
                            <Field name="name" placeholder="First Name" type="text" component={TextboxElement} />
                        </div>
                        <div className="r-row-child">
                            <label>Application</label>
                            <Field  name="selectedApplication"
                                    placeholder="Application"
                                    options={
                                        props.applications
                                            .map((application: Application, index: number) => { 
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
                    <div className="r-row-child">
                        <label>Organization</label>
                        <Field  name="selectedOrganization"
                                placeholder="Organization"
                                options={
                                    props.organizations
                                        .map((organization: Organization, index: number) => { 
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
                    <div className="r-row-child">
                        <label>Permissions</label>
                        <Field  name="selectedPermissions"
                                multi
                                placeholder="Permissions"
                                options={
                                    props.permissions
                                        .map((permission: Permission, index: number) => { 
                                            return {
                                                value: permission.name,
                                                label: permission.displayName
                                            }
                                        })
                                }
                                component={PickerElement}/>
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <ButtonElement type="submit"  color="neutral" text="Create Role" />
                        <ButtonElement type="button" color="cancel" text="Cancel" onClick={() => props.navigateToRoles()} />
                    </div>
                </div>
            </div>
        </Wrapper>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'roleCreateForm' })(RoleCreateForm) as any; 