import React from 'react'
import {Field, FieldArray, reduxForm, InjectedFormProps} from 'redux-form'
import {TextboxElement, ButtonElement, Wrapper, PickerElement} from '@reperio/ui-components';
import PermissionsArray from '../permissions/permissionsArray';
import Permission from '../../models/permission';
import Role from '../../models/role';
import Dropdown from '../../models/dropdown';

interface RoleManagementProps {
    addPermission(selectedPermission: Dropdown): void;
    deleteRole(roleId: string): void;
    navigateToRoles(): void;
    onSubmit(): void;
    removePermission(): void;
    selectPermission(): void;
    errorMessage: string;
    initialValues: Role;
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
                            <div className="col-xs-12">
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
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>General Information</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Name</label>
                                        <Field name="name" placeholder="Name" type="text" component={TextboxElement} />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Permissions</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <Field  name="selectedPermission"
                                                options={
                                                    props.permissions
                                                        .filter((permission: Permission) => {
                                                            return !props.initialValues.selectedPermissions.map((x:any)=> x.value).includes(permission.id)
                                                        })
                                                        .map((permission: Permission, index: number) => { 
                                                            return {
                                                                value: permission.id,
                                                                label:permission.name
                                                            }
                                                        })
                                                }
                                                pickerValue={props.selectedPermission ? props.selectedPermission: ""}
                                                placeholder="Permissions" 
                                                component={PickerElement} 
                                                onChange={props.selectPermission} />
                                    </div>
                                    <div className="col-xs-4">
                                        <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addPermission(props.selectedPermission)}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FieldArray name="permissions"
                                                    rerenderOnEveryChange={true}
                                                    initialValues={props.initialValues.selectedPermissions}
                                                    toggle={false}
                                                    removePermission={props.removePermission}
                                                    component={PermissionsArray}/>
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="col-xs-12 management-submission-controls-container">
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToRoles()} />
                                </div>
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteRole(props.initialValues.id)} />
                                </div>
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="submit"  color="success" wide text="Save" />
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
                <div className="management-right">
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12">
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
                            <div className="col-xs-12 management-submission-controls-container">
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToRoles()} />
                                </div>
                                <div className="col-xs-4 management-submission-controls">
                                    <ButtonElement type="button" color="danger" wide text="Delete" onClick={() => props.deleteRole(props.initialValues.id)} />
                                </div>
                                <div className="col-xs-4 management-submission-controls">
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
export default reduxForm({ form: 'roleManagementForm', enableReinitialize: true })(RoleManagementForm) as any;