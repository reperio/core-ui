import React from 'react'
import {Field, FieldArray, reduxForm, InjectedFormProps} from 'redux-form'
import {TextboxElement, TextareaElement, ButtonElement, Wrapper, CheckboxElement} from '@reperio/ui-components';
import moment from 'moment';
import PermissionsArray from '../permissions/permissionsArray';
import Dropdown from '../../models/dropdown';
import RolePermission from '../../models/rolePermission';
import Role from '../../models/role';
import Permission from '../../models/permission';

interface PermissionManagementProps {
    navigateToPermissions(): void;
    onSubmit(): void;
    removePermission(): void;
    errorMessage: string;
    initialValues: Permission;
    isError: boolean;
}

type Form = PermissionManagementProps & InjectedFormProps<any>;

const PermissionManagementForm: React.SFC<Form> = (props: Form) => (
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
                                        {props.initialValues.displayName}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="profile-description">
                                        {props.initialValues.description}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="profile-lastModified">
                                        Last modified: {moment(props.initialValues.lastModified).format('MMMM D, YYYY')}
                                    </div>
                                    <div className="profile-createdDate">
                                        Created date: {moment(props.initialValues.createdDate).format('MMMM D, YYYY')}
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
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Display Name</label>
                                        <Field name="displayName" placeholder="Display Name" type="text" component={TextboxElement} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Description</label>
                                        <Field name="description" placeholder="Description" component={TextareaElement} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>System admin Permission</label>
                                        <br />
                                        <Field name="isSystemAdminPermission" checked={props.initialValues.isSystemAdminPermission} component={CheckboxElement} />
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
                                        <h2>Roles Using This Permission</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
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
                                                    component={PermissionsArray}/>
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row management-controls-bottom">
                        <Wrapper>
                            <div className="col-xs-12 management-submission-controls-container">
                                <div className="col-xs-6 management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToPermissions()} />
                                </div>
                                <div className="col-xs-6 management-submission-controls">
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
                                        {props.initialValues.displayName}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="profile-description">
                                        {props.initialValues.description}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="profile-lastModified">
                                        Last modified: {moment(props.initialValues.lastModified).format('MMMM D, YYYY')}
                                    </div>
                                    <div className="profile-createdDate">
                                        Created date: {moment(props.initialValues.createdDate).format('MMMM D, YYYY')}
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                    <div className="row">
                        <Wrapper>
                            <div className="col-xs-12 management-submission-controls-container">
                                <div className="col-xs-6 management-submission-controls">
                                    <ButtonElement type="button" color="cancel" wide text="Cancel" onClick={() => props.navigateToPermissions()} />
                                </div>
                                <div className="col-xs-6 management-submission-controls">
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
export default reduxForm({ form: 'permissionManagementForm', enableReinitialize: true })(PermissionManagementForm) as any;
