import React from 'react'
import { Wrapper, ButtonElement, PickerElement } from '@reperio/ui-components';
import {Field, reduxForm, InjectedFormProps, FieldArray } from 'redux-form';
import Organization from '../../models/organization';
import User from '../../models/user';
import Dropdown from '../../models/dropdown';

interface OrganizationsFieldArrayProps {
    removeOrganization(index: number): void;
    initialValues: Dropdown[];
}

const organizationsFieldArray: React.SFC<OrganizationsFieldArrayProps> = (props: OrganizationsFieldArrayProps) => (
    <div className="row">
        <div className="r-row-child no-padding-container">
        <hr />
        {props.initialValues.map((member:any, index:number) =>
            <div key={index}>
                <div className="r-row-child">
                    <div className="row">
                        <div className="r-row-child">
                            {props.initialValues[index].label}
                        </div>
                        <div className="r-row-child">
                            <ButtonElement type="button" color="danger" text="Leave" onClick={() => props.removeOrganization(index)} />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )}
        </div>
    </div>
);

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
                <FieldArray name="organizations"
                            rerenderOnEveryChange={true}
                            initialValues={props.initialValues.selectedOrganizations}
                            removeOrganization={props.removeOrganization}
                            component={organizationsFieldArray}/>
            </div>
        </Wrapper>
        : null }
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userManagementOrganizationsForm', enableReinitialize: true })(UserManagementOrganizationsForm) as any; 