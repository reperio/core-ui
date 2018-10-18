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
        <form>
            <div className="row">
                <Wrapper>
                    <div className="col-xs-12">
                        <div className="row">
                            <h2>Organizations</h2>
                            <hr />
                            <ButtonElement text="Create new organization" color="neutral" onClick={() => props.navigateToCreate()} />
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

export default Organizations;