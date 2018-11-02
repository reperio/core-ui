import React from 'react'
import { Wrapper, ButtonElement, PickerElement } from '@reperio/ui-components';
import {Field, reduxForm, InjectedFormProps, FieldArray } from 'redux-form';
import Organization from '../../models/organization';
import User from '../../models/user';
import Dropdown from '../../models/dropdown';
import OrganizationFieldArray from '../organizations/organizationFieldArray';

interface UserManagementProps {
    submit(): void;
    addOrganization(selectedRole: Dropdown): void;
    navigateToUsers(): void;
    onSubmit(): void;
    removeOrganization(organizationId: string): void;
    selectOrganization(): void;
    togglePanel(index: number): void;
    cancelUserOrganizations(): void;
    errorMessage: string;
    initialValues: User;
    isError: boolean;
    organizations: Organization[];
    selectedOrganization: Dropdown;
    redirectToErrorPage: boolean;
    activePanelIndex: number;
    active: boolean;
}

type Form = UserManagementProps & InjectedFormProps<any>;

const UserManagementOrganizationsForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.submit)} className="row panel-form">
    {props.initialValues ?
        <Wrapper>
            <div className="r-wrapper-child">
                <div className="row">
                    <div className="r-row-child">
                        <h2>Organizations</h2>
                    </div>
                </div>
                {props.active ? 
                <div className="row">
                    <div className="r-row-child">
                        <Field  name="selectedOrganization"
                                options={
                                    props.organizations
                                        .filter((organization: Organization) => {
                                            return !props.initialValues.selectedOrganizations.map((x: Dropdown)=> x.value).includes(organization.id)
                                        })
                                        .map((organization: Organization, index: number) => { 
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
                    <div className="r-row-child">
                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addOrganization(props.selectedOrganization)}} />
                    </div>
                </div>
                : null }
                <FieldArray name="organizations"
                            active={props.active}
                            rerenderOnEveryChange={true}
                            initialValues={props.initialValues.selectedOrganizations}
                            removeOrganization={props.removeOrganization}
                            component={OrganizationFieldArray}/>
            </div>
        </Wrapper>
        : null }
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userManagementOrganizationsForm', enableReinitialize: true })(UserManagementOrganizationsForm) as any; 