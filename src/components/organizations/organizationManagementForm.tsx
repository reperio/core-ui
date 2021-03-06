import React from 'react'
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import {TextboxElement, ButtonElement, Wrapper, PickerElement} from '@reperio/ui-components';
import OrganizationManagementUsers from './organizationManagementUsers';
import Dropdown from '../../models/dropdown';
import { User, Organization } from '@reperio/core-connector';
import { OrganizationViewModel } from '../../models/organizationViewModel';

interface OrganizationManagementProps {
    addUser(s: Dropdown): void;
    deleteOrganization(organizationId: string): void;
    navigateToOrganizations(): void;
    onSubmit(): void;
    removeUser(): void;
    selectUser(): void;
    canDeleteOrganizations: boolean;
    canUpdateOrganizations: boolean;
    errorMessage: string;
    initialValues: Organization;
    selectedUsers: User[];
    isError: boolean;
    selectedUser: Dropdown;
    users: User[];
}

type Form = OrganizationManagementProps & InjectedFormProps<any>;

const OrganizationManagementForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="management-form">
        {props.isError ? <p className="alert alert-danger">{props.errorMessage}</p> : ""}
        {props.initialValues ? 
            <div className="management-container">
                <div className="management-left">
                    <div className="row management-top">
                        <Wrapper>
                            <div className="r-row-child">
                                <div className="row">
                                    <div className="management-name">
                                        {props.initialValues.name}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <fieldset disabled={!props.canUpdateOrganizations} className="row">
                        <Wrapper>
                            <div className="r-wrapper-child ">
                                <div className="row">
                                    <div className="r-row-child">
                                        <h2>General Information</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <label>Name</label>
                                        <Field name="name" placeholder="Name" type="text" component={TextboxElement} />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </fieldset>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToOrganizations()} />
                                </div>
                                {props.canDeleteOrganizations ? 
                                    <div className="r-row-child management-submission-controls">
                                        <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteOrganization(props.initialValues.id)} />
                                    </div>
                                : null }
                                {props.canUpdateOrganizations ? 
                                    <div className="r-row-child management-submission-controls">
                                        <ButtonElement type="submit"  color="success" wide text="Save" />
                                    </div>
                                : null }
                            </div>
                        </Wrapper>
                    </div>
                </div>
                <div className="management-right">
                    <div className="row">
                        <Wrapper>
                            <div className="row">
                                <div className="r-row-child management-name">
                                    {props.initialValues.name}
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Back" onClick={() => props.navigateToOrganizations()} />
                                </div>
                                {props.canDeleteOrganizations ? 
                                    <div className="r-row-child management-submission-controls">
                                        <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteOrganization(props.initialValues.id)} />
                                    </div>
                                : null }
                                {props.canUpdateOrganizations ? 
                                    <div className="r-row-child management-submission-controls">
                                        <ButtonElement type="submit"  color="success" wide text="Save" />
                                    </div>
                                : null }
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