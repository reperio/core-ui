import React from 'react'
import {Grid, Wrapper} from '@reperio/ui-components';
import { Permission } from '@reperio/core-connector';

interface PermissionsProps {
    navigateToManagement(permissionName: string): void;
    gridData: Permission[];
    pages: number;
    onFetchData?(page: number, pageSize: number, sorted: boolean, filtered: boolean): any
}

const Permissions = (props: PermissionsProps) => {
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
    ];

    return (
        <div className="r-wrapper-container">
            <Wrapper flexColumnDirection={true}>
                <div className="row"></div>
                <div className="row">
                    <div className="r-row-child">
                        <Grid
                            columns={gridColumns} 
                            data={props.gridData}
                            rowClick={(state: any, rowInfo: any) => { 
                                return { onClick: (e:any) => {
                                    if (e.target.innerHTML !== '<span>&nbsp;</span>') {
                                        props.navigateToManagement(rowInfo.original.name)
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
    )
};

export default Permissions;