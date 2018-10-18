import React from 'react'
import {Grid, Wrapper, ButtonElement} from '@reperio/ui-components';
import Role from '../../models/role';

interface RolesProps {
    navigateToCreate(): void;
    navigateToManagement(permissionId: string): void;
    gridData: Role[];
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
        <form>
            <div className="row">
                <Wrapper>
                    <div className="col-xs-12">
                        <div className="row">
                            <h2>Roles</h2>
                            <hr />
                            <ButtonElement text="Create new role" color="neutral" onClick={() => props.navigateToCreate()} />
                        </div>
                        <div className="row">
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
        </form>
    )
};

export default Roles;