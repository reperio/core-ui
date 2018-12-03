import React from 'react'
import {Field, FieldArray, reduxForm, InjectedFormProps} from 'redux-form'
import {TextboxElement, TextareaElement, ButtonElement, Wrapper, CheckboxElement} from '@reperio/ui-components';
import moment from 'moment';
import PermissionsArray from '../permissions/permissionsArray';
import Dropdown from '../../models/dropdown';
import RolePermission from '../../models/rolePermission';
import Role from '../../models/role';
import { Permission } from '../../models/permission';
import { Redirect } from 'react-router';

interface PermissionManagementProps {
    navigateToPermissions(): void;
    onSubmit(): void;
    removePermission(): void;
    canUpdatePermissions: boolean;
    errorMessage: string;
    initialValues: Permission;
    isError: boolean;
}

type Form = PermissionManagementProps & InjectedFormProps<any>;

const PermissionManagementForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.isError ?
            <Redirect to="/error" /> 
        : null }
        {props.initialValues ? 
            <div className="management-container">
                <div className="management-left">
                    <div className="row management-top">
                        <Wrapper>
                            <div className="r-row-child">
                                <div className="row">
                                    <div className="management-name">
                                        {props.initialValues.displayName}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        {props.initialValues.description}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        Last modified: {moment(props.initialValues.lastModified).format('MMMM D, YYYY')}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        Created date: {moment(props.initialValues.createdDate).format('MMMM D, YYYY')}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <fieldset disabled={!props.canUpdatePermissions} className="row">
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
                                        <Field name="name" placeholder="Name" type="text" component={TextboxElement} disabled />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <label>Display Name</label>
                                        <Field name="displayName" placeholder="Display Name" type="text" component={TextboxElement} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <label>Description</label>
                                        <Field name="description" placeholder="Description" component={TextareaElement} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        <label>System admin Permission</label>
                                        <br />
                                        <Field name="isSystemAdminPermission" checked={props.initialValues.isSystemAdminPermission} component={CheckboxElement} />
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </fieldset>
                    <fieldset disabled={!props.canUpdatePermissions} className="row">
                        <Wrapper flexColumnDirection={true}>
                            <div className="r-wrapper-child ">
                                <div className="row">
                                    <div className="r-row-child">
                                        <h2>Roles Using This Permission</h2>
                                    </div>
                                </div>
                                <FieldArray name="roles"
                                            rerenderOnEveryChange={true}
                                            initialValues={
                                                [].concat(...props.initialValues.rolePermissions
                                                    .map((x: RolePermission) => x.role)
                                                )
                                                .map((y:Role)=> { 
                                                    return {
                                                        label: y.name, value: y.id 
                                                    }
                                                })
                                                .sort((a: Dropdown, b: Dropdown) => a.label.localeCompare(b.label))
                                            }
                                            removePermission={props.removePermission}
                                            canUpdateRoles={props.canUpdatePermissions}
                                            component={PermissionsArray}/>
                            </div>
                        </Wrapper>
                    </fieldset>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToPermissions()} />
                                </div>
                                {props.canUpdatePermissions ? 
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
                                        {props.initialValues.displayName}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        {props.initialValues.description}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        Last modified: {moment(props.initialValues.lastModified).format('MMMM D, YYYY')}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="r-row-child">
                                        Created date: {moment(props.initialValues.createdDate).format('MMMM D, YYYY')}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="row management-submission-controls-container">
                                <div className="r-row-child management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToPermissions()} />
                                </div>
                                {props.canUpdatePermissions ? 
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
export default reduxForm({ form: 'permissionManagementForm', enableReinitialize: true })(PermissionManagementForm) as any;
