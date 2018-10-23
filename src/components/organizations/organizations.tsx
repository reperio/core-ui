import React from 'react'
import {Grid, Wrapper, ButtonElement} from '@reperio/ui-components';
import Organization from '../../models/organization';

interface OrganizationsProps {
    navigateToCreate(): void;
    navigateToManagement(organizationId: string): void;
    gridData: Organization[];
}

const Organizations = (props: OrganizationsProps) => {
    const gridColumns = [
        {
            Header: "Name",
            accessor: "name",
            Placeholder: "Name"
        },
        {
            Header: "Personal",
            id: "personal",
            accessor: (organization: Organization) => organization.personal.toString()
        }
    ];

    return (
        <div className="r-wrapper-container">
            <Wrapper flexColumnDirection={true}>
                <div className="row">
                    <div className="r-row-child">
                        <h2>Organizations</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <ButtonElement text="Create new organization" color="neutral" onClick={() => props.navigateToCreate()} />
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

export default Organizations;