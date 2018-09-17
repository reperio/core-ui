import React from 'react'
import {Grid, Wrapper} from '@reperio/ui-components';

const Permissions = (props: any) => {
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
        <form>
            <div className="row">
                <Wrapper>
                    <div className="col-xs-12">
                        <div className="row">
                            <h2>Permissions</h2>
                            <hr />
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

export default Permissions;