import React from 'react'
import Dropdown from "../../models/dropdown";
import { ButtonElement } from "@reperio/ui-components";
import { Organization } from '@reperio/core-connector';

interface OrganizationFieldArrayProps {
    removeOrganization(index: number): void;
    initialValues: Organization[];
    active: boolean;
}

const OrganizationFieldArray: React.SFC<OrganizationFieldArrayProps> = (props: OrganizationFieldArrayProps) => (
    <div className="row">
        <div className="r-row-child no-padding-container">
        <hr />
        {props.initialValues.map((member:any, index:number) =>
            <div key={index}>
                <div className="r-row-child">
                    <div className="row">
                        <div className="r-row-child">
                            {(props.initialValues[index].personal ? 'Personal - ' : '') + props.initialValues[index].name}
                        </div>
                        <div className="r-row-child">
                            {props.active ?
                                <ButtonElement type="button" color="danger" text="Leave" onClick={() => props.removeOrganization(index)} />
                            : null}
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )}
        </div>
    </div>
);

export default OrganizationFieldArray;