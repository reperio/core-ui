import React from 'react'
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import {TextboxElement, ButtonElement, Wrapper, PickerElement} from '@reperio/ui-components';
import OrganizationManagementUsers from './organizationManagementUsers';
import Dropdown from '../../models/dropdown';
import User from '../../models/user';
import Organization from '../../models/organization';

interface OrganizationManagementProps {
    addUser(s: Dropdown): void;
    deleteOrganization(organizationId: string): void;
    navigateToOrganizations(): void;
    onSubmit(): void;
    removeUser(): void;
    selectUser(): void;
    errorMessage: string;
    initialValues: Organization;
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
                    <div className="row">
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
                    </div>
                    <div className="row">
                        <Wrapper flexColumnDirection={true}>
                            <div className="r-wrapper-child ">
                                <div className="row">
                                    <div className="r-row-child">
                                        <h2>Users</h2>
                                        <hr />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <Field  name="selectedUser"
                                                options={
                                                    props.users
                                                        .filter((user: User) => {
                                                            return !props.initialValues.selectedUsers.map((x:any)=> x.value).includes(user.id)
                                                        })
                                                        .map((user: User, index: number) => { 
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
                                    <div className="r-row-child">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addUser(props.selectedUser)}} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <OrganizationManagementUsers    gridData={                                            
                                                                            props.users
                                                                                .filter((user: User) => {
                                                                                    return props.initialValues.selectedUsers.map((x:Dropdown)=> x.value).includes(user.id)
                                                                                })}
                                                                        removeUser={props.removeUser} />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToOrganizations()} />
                                </div>
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteOrganization(props.initialValues.id)} />
                                </div>
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="submit"  color="success" wide text="Save" />
                                </div>
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
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToOrganizations()} />
                                </div>
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteOrganization(props.initialValues.id)} />
                                </div>
                                <div className="r-row-child management-submission-controls">
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