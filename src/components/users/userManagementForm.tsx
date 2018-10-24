import React from 'react'
import { TextboxElement, ButtonElement, PickerElement, Wrapper, CheckboxElement } from '@reperio/ui-components';
import {Field, reduxForm, FieldArray, InjectedFormProps } from 'redux-form'
import Organization from '../../models/organization';
import Dropdown from '../../models/dropdown';
import Role from '../../models/role';
import RolePermission from '../../models/rolePermission';
import User from '../../models/user';
import SelectedRole from '../../models/selectedRole';
import { StateAuthSession } from '../../store/initialState';
import UserEmail from '../../models/userEmail';
import { Redirect } from 'react-router';

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

interface UserEmailFieldArrayProps {
    removeEmailAddress(index: number): void;
    sendVerificationEmail(index: number): void;
    setPrimaryEmailAddress(index: number): void;
    initialValues: {
        userEmails: UserEmail[],
        primaryEmailAddress: string
    };
    fields: any[];
}


const userEmailFieldArray: React.SFC<UserEmailFieldArrayProps> = (props: UserEmailFieldArrayProps) => (
        <div className="row">
            <div className="r-row-child no-padding-container">
            {props.fields.map((member:string, index:number) =>
                <div className="row" key={index}>
                    <div className="r-row-child">
                        <Field  disabled={true} 
                                name={`${member}.email`} 
                                placeholder="Email Address" 
                                type="email" 
                                component={TextboxElement} />
                    </div>
                    <div className="r-row-child">
                        <ButtonElement  type="button"
                                        title="Remove Email"
                                        color="danger"
                                        disabled={props.initialValues.userEmails[index] && props.initialValues.userEmails[index].email == props.initialValues.primaryEmailAddress}
                                        children={
                                            <i className="fa fa-trash"></i>
                                        }
                                        onClick={() => props.removeEmailAddress(index)}/>
                        <ButtonElement  type="button"
                                        title="Send Verification Email"
                                        color="neutral" 
                                        disabled={props.initialValues.userEmails[index] && props.initialValues.userEmails[index].emailVerified == true || !props.initialValues.userEmails[index].id}
                                        children={
                                            <i className="fa fa-paper-plane"></i>
                                        } 
                                        onClick={() => props.sendVerificationEmail(index)}/>
                        <Field  checked={props.initialValues.userEmails[index].primary == null || !props.initialValues.primaryEmailAddress ? false : props.initialValues.userEmails[index].primary}
                                disabled={props.initialValues.userEmails[index] && props.initialValues.userEmails[index].emailVerified == false || !props.initialValues.userEmails[index].id}
                                id={`${index}`}
                                title="Set As Primary Email Address"
                                name={`${member}.primary`} 
                                label="Primary" 
                                onChange={() => props.setPrimaryEmailAddress(index)}
                                component={CheckboxElement} />
                    </div>
                </div>
            )}
        </div>
    </div>
);

interface RolesAndPermissionsFieldArrayProps {
    toggleRoleDetails(index: number): void;
    removeRole(index: number): void;
    initialValues: SelectedRole[];
    toggle: boolean;
    organizations: Organization[];
}

const rolesAndPermissionsFieldArray: React.SFC<RolesAndPermissionsFieldArrayProps> = (props: RolesAndPermissionsFieldArrayProps) => (
    <div>
        <div className="r-row-child no-padding-container">
            <hr />
            {props.initialValues.map((member:any, index:number) =>
                <div key={index}>
                    <div className="r-row-child">
                        <div className="row">
                            <div className="r-row-child roles-permissions-row" onClick={() => props.toggle ? props.toggleRoleDetails(index) :  null}>
                                <div className={`fa ${props.initialValues[index].role.visible ? 'fa-caret-down' : 'fa-caret-right'} fa-lg roles-permissions-row-arrow`}></div>
                                {props.organizations.filter((organization: Organization) => organization.id == props.initialValues[index].organizationId)[0].name + ' - ' + props.initialValues[index].label}
                            </div>
                            <div className="r-row-child">
                                <ButtonElement type="button" color="danger" text="Remove" onClick={() => props.removeRole(index)} />
                            </div>
                        </div>
                        <div className="row">
                            {props.toggle && props.initialValues[index].role.visible ? 
                                <div className="r-row-child roles-permissions-detail-container">
                                    <div className="row">
                                        <div className="r-row-child roles-permissions-detail-header">
                                            Permissions
                                        </div>
                                    </div>
                                        {props.initialValues[index].role.rolePermissions.map((rolePermission: RolePermission, index: number) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="r-row-child no-padding-container">
                                                        <div className="row">
                                                            <div className="r-row-child roles-permissions-detail-permission-name">
                                                                {rolePermission.permission.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="r-row-child no-padding-container">
                                                        <div className="row">
                                                            <div className="r-row-child">
                                                                {rolePermission.permission.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                            : null }
                            <hr />
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

interface UserManagementProps {
    addEmailAddress(): void;
    addOrganization(selectedRole: Dropdown): void;
    addRole(selectedRole: Dropdown): void;
    navigateToUsers(): void;
    onSubmit(): void;
    removeEmailAddress(): void;
    removeOrganization(organizationId: string): void;
    removeRole(roleId: string): void;
    selectOrganization(): void;
    selectRole(): void;
    sendVerificationEmail(): void;
    setPrimaryEmailAddress(): void;
    authSession: StateAuthSession;
    errorMessage: string;
    initialValues: User;
    isError: boolean;
    organizations: Organization[];
    roles: Role[];
    selectedOrganization: Dropdown;
    selectedRole: Dropdown;
    toggleRoleDetails: boolean;
    redirectToErrorPage: boolean;
}

type Form = UserManagementProps & InjectedFormProps<any>;

const UserManagementForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.redirectToErrorPage ?
            <Redirect to="/error" /> 
        : null }
        {props.initialValues ? 
            <div className="management-container">
                <div className="management-left">
                    <div className="row management-top">
                        <Wrapper>
                            <div className="r-wrapper-child">
                                <div className="row">
                                    <div className="r-row-child">
                                        <div className="profile-circle">
                                            {props.initialValues.firstName.charAt(0).toUpperCase()}{props.initialValues.lastName.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="r-row-child">
                                        <div className="row management-name">
                                                {props.initialValues.firstName} {props.initialValues.lastName}
                                        </div>
                                        <div className="row profile-primaryEmailAddress">
                                            {props.initialValues.primaryEmailAddress}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="r-wrapper-child">
                                <div className="row">
                                    <div className="r-row-child">
                                        <h2>General Information</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <label>First Name</label>
                                        <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
                                    </div>
                                    <div className="r-row-child">
                                        <label>Last Name</label>
                                        <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="r-wrapper-child">
                                <div className="row">
                                    <div className="r-row-child">
                                        <h2>Emails</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <Field  name="email"
                                                placeholder="Email Address"
                                                component={TextboxElement} />
                                    </div>
                                    <div className="r-row-child">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addEmailAddress()}} />
                                    </div>
                                </div>
                                <FieldArray name="userEmails"
                                            initialValues={{userEmails: props.initialValues.userEmails, primaryEmailAddress: props.initialValues.primaryEmailAddress}}
                                            setPrimaryEmailAddress={props.setPrimaryEmailAddress}
                                            sendVerificationEmail={props.sendVerificationEmail}
                                            removeEmailAddress={props.removeEmailAddress}
                                            component={userEmailFieldArray}/>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
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
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="r-wrapper-child">
                                <div className="row">
                                    <div className="r-row-child">
                                        <h2>Roles and Permissions</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <Field  name="selectedRole"
                                                options={
                                                    props.roles
                                                        .filter((role: Role) => {
                                                            return !props.initialValues.selectedRoles.map((x: Dropdown)=> x.value).includes(role.id)
                                                        })
                                                        .map((role: Role, index: number) => { 
                                                            return {
                                                                value: role.id,
                                                                label:role.name
                                                            }
                                                        })
                                                }
                                                pickerValue={props.selectedRole ? props.selectedRole: ""}
                                                placeholder="Roles" 
                                                component={PickerElement} 
                                                onChange={props.selectRole} />
                                    </div>
                                    <div className="r-row-child">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addRole(props.selectedRole)}} />
                                    </div>
                                </div>
                                <FieldArray name="roles"
                                            rerenderOnEveryChange={true}
                                            initialValues={props.initialValues.selectedRoles}
                                            organizations={props.organizations}
                                            toggleRoleDetails={props.toggleRoleDetails}
                                            removeRole={props.removeRole}
                                            toggle={true}
                                            component={rolesAndPermissionsFieldArray}/>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToUsers()} />
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
                            <div className="r-wrapper-child">
                                <div className="row">
                                    <div className="r-row-child">
                                        <div className="profile-circle">
                                            {props.initialValues.firstName.charAt(0).toUpperCase()}{props.initialValues.lastName.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="r-row-child">
                                        <div className="row management-name">
                                                {props.initialValues.firstName} {props.initialValues.lastName}
                                        </div>
                                        <div className="row profile-primaryEmailAddress">
                                            {props.initialValues.primaryEmailAddress}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToUsers()} />
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
export default reduxForm({ form: 'userManagementForm', enableReinitialize: true })(UserManagementForm) as any; 