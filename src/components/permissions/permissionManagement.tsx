import React from 'react'
import {Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import {ButtonElement, GridElement} from '@reperio/ui-components';

const gridColumns = [
    {
        Header: "Name",
        accessor: "name",
        Placeholder: "Name"
    },
    {
        Header: "Description",
        accessor: "description",
        Placeholder: "Description"
    }
]

const PermissionManagement = (props: any) => (
    <div>
        <h2>Permission Management</h2>
        <ButtonElement color="neutral" text="Add Permission" onClick={() => {props.redirectToEditorCreate()}}/>
        <hr />
        <GridElement
            columns={gridColumns}
            data={props.gridData}
            filterable={true} />
    </div>
);

export default PermissionManagement;