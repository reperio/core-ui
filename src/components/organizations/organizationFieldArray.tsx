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
        <table className="field-array-table">
            <tbody>
                {props.initialValues.map((member:any, index:number) =>
                <tr key={index}>
                    <td>
                        <div className="field-array-item">
                            {(props.initialValues[index].personal ? 'Personal - ' : '') + props.initialValues[index].name}
                        </div>
                        <div className="field-array-item">
                            {props.active ?
                                <ButtonElement type="button" color="danger" text="Leave" onClick={() => props.removeOrganization(index)} />
                                : null}
                        </div>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default OrganizationFieldArray;