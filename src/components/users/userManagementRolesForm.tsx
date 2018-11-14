import React from 'react'
import { Wrapper, ButtonElement, PickerElement } from '@reperio/ui-components';
import {Field, reduxForm, InjectedFormProps, FieldArray } from 'redux-form';
import Organization from '../../models/organization';
import User from '../../models/user';
import Dropdown from '../../models/dropdown';
import Role from '../../models/role';
import RolePermissionFieldArray from '../roles/rolePermissionFieldArray';

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
    active: boolean;
}

type Form = UserManagementProps & InjectedFormProps<any>;

const UserManagementRolesForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.submit)} className="row r-editable-panel-form">
    {props.initialValues ?
        <Wrapper>
            <div className="r-wrapper-child">
                <div className="row">
                    <div className="r-row-child">
                        <h2>Roles and Permissions</h2>
                    </div>
                </div>
                {props.active ?
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
                : null}
                <FieldArray name="roles"
                            active={props.active}
                            rerenderOnEveryChange={true}
                            initialValues={props.initialValues.selectedRoles}
                            organizations={props.organizations}
                            toggleRoleDetails={props.toggleRoleDetails}
                            removeRole={props.removeRole}
                            toggle={true}
                            component={RolePermissionFieldArray}/>
            </div>
        </Wrapper>
    : null }
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userManagementRolesForm', enableReinitialize: true })(UserManagementRolesForm) as any; 