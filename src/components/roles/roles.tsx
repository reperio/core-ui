import React from 'react'
import {Grid, Wrapper} from '@reperio/ui-components';

const Roles = (props: any) => {
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