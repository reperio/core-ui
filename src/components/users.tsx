import React from 'react'
import { Grid, ButtonElement, Wrapper } from '@reperio/ui-components';

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
    <form>
        <div className="row">
            <Wrapper>
                <div className="col-xs-12">
                    <div className="row">
                        <h2>Users</h2>
                        <hr />
                        <ButtonElement text="Create new user" color="neutral" onClick={() => props.navigateToUserCreate()} />
                    </div>
                    <div className="row">
                        <Grid
                            columns={gridColumns} 
                            data={props.gridData}
                            rowClick={(state: any, rowInfo: any) => { 
                                return { onClick: (e:any) => {
                                    if (e.target.innerHTML !== '<span>&nbsp;</span>') {
                                        props.navigateToManagement(rowInfo.original)
                                    }
                                }}
                            }}
                            filterable={true} />
                    </div>
                </div>
            </Wrapper>
        </div>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default Users;