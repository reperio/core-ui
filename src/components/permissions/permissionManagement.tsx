import React from 'react'
import {Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import {ButtonElement, GridElement} from '@reperio/ui-components';

const PermissionManagement = (props: any) => {
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
        },
        {
            Header: "",
            id: "edit",
            Cell: ({row}: any) => (<ButtonElement color="neutral" text="Edit" onClick={() => {props.redirectToEditorEdit(row._original.id)}}/>)
        }
    ];

    return (
    <div>
        <h2>Permission Management</h2>
        <ButtonElement color="neutral" text="Add Permission" onClick={() => {props.redirectToEditorCreate()}}/>
        <hr />
        <GridElement
            columns={gridColumns}
            data={props.gridData}
            filterable={true} />
    </div>)
};

export default PermissionManagement;