import React from 'react'
import { Grid, ButtonElement, Wrapper } from '@reperio/ui-components';
import { User } from '@reperio/core-connector';

interface UsersProps {
    navigateToManagement(permissionName: string): void;
    navigateToUserCreate(): void;
    gridData: User[];
    pages: number;
    onFetchData?(page: number, pageSize: number, sorted: boolean, filtered: boolean): any
}

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
        accessor: "primaryEmailAddress",
        Placeholder: "Email"
    }
]

const Users = (props: UsersProps) => (
    <div className="r-wrapper-container">
        <Wrapper flexColumnDirection={true}>
            <div className="row"></div>
            <div className="row">
                <div className="r-row-child">
                    <ButtonElement text="Create new user" color="neutral" onClick={() => props.navigateToUserCreate()} />
                </div>
            </div>
            <div className="row">
                <div className="r-row-child">
                    <Grid
                        columns={gridColumns} 
                        data={props.gridData}
                        rowClick={(state: any, rowInfo: any) => { 
                            return { onClick: (e:any) => {
                                if (e.target.innerHTML !== '<span>&nbsp;</span>') {
                                    props.navigateToManagement(rowInfo.original.id)
                                }
                            }}
                        }}
                        filterable={true}
                        manual={true}
                        onFetchData={props.onFetchData}
                        pages={props.pages} />
                </div>
            </div>
        </Wrapper>
    </div>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default Users;