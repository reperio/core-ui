import React from 'react'
import {Field, reduxForm } from 'redux-form'
import {FormGroup} from "react-bootstrap";
import { GridElement } from '@reperio/ui-components';

const gridColumns = [
    {
        Header: "First Name",
        accessor: "firstName",
        Placeholder: "test"
    },
    {
        Header: "Last Name",
        accessor: "lastName",
        Placeholder: "test1"
    },
    {
        Header: "Age",
        accessor: "age",
        Placeholder: "test2"
    }
]

const UserManagement = (props: any) => (
    <div>
        <h2>User UserManagement</h2>
        <hr />
        <GridElement
            columns={gridColumns} 
            data={props.gridData}
            filterable={true} />
    </div>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default UserManagement;