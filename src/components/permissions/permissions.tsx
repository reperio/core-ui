import React from 'react'
import {Grid, Wrapper} from '@reperio/ui-components';
import Permission from '../../models/permission';

interface PermissionsProps {
    navigateToManagement(permissionId: string): void;
    gridData: Permission[];
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
                <div className="row">
                    <div className="r-row-child">
                        <h2>Permissions</h2>
                        <hr />
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
                            filterable={true} />
                    </div>
                </div>
            </Wrapper>
        </div>
    )
};

export default Permissions;