import React from 'react'
import { GridElement, ButtonElement } from '@reperio/ui-components';

const gridColumns = [
    {
        Header: "First Name",
        accessor: "firstName",
        Placeholder: "First Name"
    },
    {
        Header: "Last Name",
        accessor: "lastName",
        Placeholder: "Last Name"
    },
    {
        Header: "Email",
        accessor: "primaryEmail",
        Placeholder: "Email"
    }
]

const Users = (props: any) => (
    <div>
        <h2>Users</h2>
        <hr />
        <ButtonElement text="Create new user" color="neutral" onClick={() => props.navigateToUserCreate()} />
        <br />
        <br />
        <GridElement
            columns={gridColumns} 
            data={props.gridData}
            filterable={true} />
    </div>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default Users;