import React from 'react'
import {Field, FieldArray, reduxForm, InjectedFormProps} from 'redux-form'
import {TextboxElement, ButtonElement, Wrapper, PickerElement} from '@reperio/ui-components';
import PermissionsArray from '../permissions/permissionsArray';
import Dropdown from '../../models/dropdown';
import { RoleViewModel } from '../../models/roleViewModel';
import { Permission, Role } from '@reperio/core-connector';

interface RoleManagementProps {
    addPermission(selectedPermission: Dropdown): void;
    deleteRole(roleId: string): void;
    navigateToRoles(): void;
    onSubmit(): void;
    removePermission(): void;
    selectPermission(): void;
    canDeleteRoles: boolean;
    canUpdateRoles: boolean;
    errorMessage: string;
    initialValues: Role;
    selectedPermissions: Permission[];
    isError: boolean;
    permissions: Permission[];
    selectedPermission: Dropdown;
}

type Form = RoleManagementProps & InjectedFormProps<any>;

const RoleManagementForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.isError ? <p className="alert alert-danger">{props.errorMessage}</p> : ""}
        {props.initialValues ? 
            <div className="management-container">
                <div className="management-left">
                    <div className="row management-top">
                        <Wrapper>
                            <div className="r-wrapper-child">
                                <div className="row">
                                    <div className="management-name">
                                        {props.initialValues.name}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <fieldset disabled={!props.canUpdateRoles} className="row">
                        <Wrapper>
                            <div className="r-wrapper-child">
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
                    <fieldset disabled={!props.canUpdateRoles} className="row">
                        <Wrapper>
                            <div className="r-wrapper-child">
                                <div className="row">
                                    <div className="r-row-child">
                                        <h2>Permissions</h2>
                                    </div>
                                </div>
                                {props.canUpdateRoles ? 
                                    <div className="row">
                                        <div className="r-row-child">
                                            <Field  name="selectedPermission"
                                                    options={
                                                        props.permissions
                                                            .filter((permission: Permission) => {
                                                                return !props.selectedPermissions.map((x:Permission)=> x.name).includes(permission.name)
                                                            })
                                                            .map((permission: Permission, index: number) => { 
                                                                return {
                                                                    value: permission.name,
                                                                    label:permission.displayName
                                                                }
                                                            })
                                                    }
                                                    pickerValue={props.selectedPermission ? props.selectedPermission: ""}
                                                    placeholder="Permissions" 
                                                    component={PickerElement} 
                                                    onChange={props.selectPermission} />
                                        </div>
                                        <div className="r-row-child">
                                            <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addPermission(props.selectedPermission)}} />
                                        </div>
                                    </div>
                                : null }
                                <FieldArray name="permissions"
                                            canUpdateRoles={props.canUpdateRoles}
                                            rerenderOnEveryChange={true}
                                            initialValues={props.selectedPermissions}
                                            toggle={false}
                                            removePermission={props.removePermission}
                                            component={PermissionsArray}/>
                            </div>
                        </Wrapper>
                    </fieldset>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToRoles()} />
                                </div>
                                {props.canDeleteRoles ? 
                                    <div className="r-row-child management-submission-controls">
                                        <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteRole(props.initialValues.id)} />
                                    </div>
                                : null }
                                {props.canUpdateRoles ? 
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
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToRoles()} />
                                </div>
                                {props.canDeleteRoles ? 
                                    <div className="r-row-child management-submission-controls">
                                        <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteRole(props.initialValues.id)} />
                                    </div>
                                : null }
                                {props.canUpdateRoles ? 
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
export default reduxForm({ form: 'roleManagementForm', enableReinitialize: true })(RoleManagementForm) as any;