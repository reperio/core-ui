import React from 'react'
import {Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { TextboxElement, ButtonElement } from '@reperio/ui-components';

const PermissionEditorForm = (props: any) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        {props.isError ? <p className="alert alert-danger">{props.errorMessage}</p> : ""}
        <h2>{props.isNewDescription ? "Create Permission" : "Edit Permission"}</h2>
        <FormGroup>
            <Field name="name" placeholder="Name" type="text" component={TextboxElement} />
        </FormGroup>
        <FormGroup>
            <Field name="description" placeholder="Description" type="text" component={TextboxElement} />
        </FormGroup>
        <FormGroup>
            <ButtonElement color="neutral"  text="Submit" />
            <ButtonElement color="cancel" text="Cancel" onClick={props.onCancel}/>
        </FormGroup>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'permissionEditorForm', enableReinitialize: true })(PermissionEditorForm) as any;