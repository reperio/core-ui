import React from 'react'
import { Wrapper, ButtonElement, PickerElement } from '@reperio/ui-components';
import {Field, reduxForm, InjectedFormProps, FieldArray } from 'redux-form';
import Organization from '../../models/organization';
import User from '../../models/user';
import Dropdown from '../../models/dropdown';
import SelectedRole from '../../models/selectedRole';
import RolePermission from '../../models/rolePermission';
import Role from '../../models/role';

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
                                                                {rolePermission.permission.displayName}
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
    addRole(selectedRole: Dropdown): void;
    navigateToUsers(): void;
    onSubmit(): void;
    removeRole(roleId: string): void;
    selectRole(): void;
    submit(): void;
    togglePanel(index: number): void;
    cancelUserRolesPermissions(): void;
    errorMessage: string;
    initialValues: User;
    isError: boolean;
    organizations: Organization[];
    roles: Role[];
    selectedRole: Dropdown;
    toggleRoleDetails: boolean;
    redirectToErrorPage: boolean;
    activePanelIndex: number;
}

type Form = UserManagementProps & InjectedFormProps<any>;

const UserManagementRolesForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.submit)} className="row panel-form">
    {props.initialValues ?
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
    : null }
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userManagementRolesForm', enableReinitialize: true })(UserManagementRolesForm) as any; 