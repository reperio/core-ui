import React from 'react'
import {Grid, Wrapper, ButtonElement} from '@reperio/ui-components';
import { Role } from '@reperio/core-connector';

interface RolesProps {
    navigateToCreate(): void;
    navigateToManagement(permissionName: string): void;
    gridData: Role[];
    pages: number;
    onFetchData?(page: number, pageSize: number, sorted: boolean, filtered: boolean): any
}

const Roles = (props: RolesProps) => {
    const gridColumns = [
        {
            Header: "Name",
            accessor: "name",
            Placeholder: "Name"
        }
    ];

    return (
        <div className="r-wrapper-container">
            <Wrapper flexColumnDirection={true}>
                <div className="row"></div>
                <div className="row">
                    <div className="r-row-child">
                        <ButtonElement text="Create new role" color="neutral" onClick={() => props.navigateToCreate()} />
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
    )
};

export default Roles;