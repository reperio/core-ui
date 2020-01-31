import React from 'react'
import { ButtonElement } from '@reperio/ui-components';
import { Role, Organization, RolePermission } from '@reperio/core-connector';

interface RolePermissionFieldArrayProps {
    toggleRoleDetails(index: number): void;
    removeRole(index: number): void;
    initialValues: Role[];
    toggle: boolean;
    organizations: Organization[];
    active: boolean;
    activeRoleDetailIndex: number;
}

const RolePermissionFieldArray: React.SFC<RolePermissionFieldArrayProps> = (props: RolePermissionFieldArrayProps) => (
    <div className="row">
        <table className="field-array-table">
            <tbody>
                {props.initialValues.map((member:any, index:number) =>
                    <tr key={index}>
                        <td>
                            <div className="field-array-item">
                                <div className="row no-margin-container">
                                    <div onClick={() => props.toggle && props.active ? props.toggleRoleDetails(index) :  null}>
                                        <div className={`fa ${props.active ? props.activeRoleDetailIndex === index ? 'fa-caret-down' : 'fa-caret-right' :''} fa-lg roles-permissions-row-arrow`}></div>
                                        {(props.organizations.filter((organization: Organization) => organization.id == props.initialValues[index].organizationId).length ? 
                                            props.organizations.filter((organization: Organization) => organization.id == props.initialValues[index].organizationId)[0].name + ' - ' + props.initialValues[index].name
                                            : '')}
                                    </div>
                                    <div className="r-row-child">
                                        {props.active ?
                                            <ButtonElement type="button" color="danger" text="Remove" onClick={() => props.removeRole(index)} />
                                        : null }
                                    </div>
                                </div>
                                <div className="row no-margin-container">
                                    {props.toggle && props.activeRoleDetailIndex === index ? 
                                        <div className="r-row-child roles-permissions-detail-container">
                                            <div className="row">
                                                <div className="r-row-child roles-permissions-detail-header">
                                                    Permissions
                                                </div>
                                            </div>
                                            <table>
                                                <tbody>
                                                    {props.initialValues[index].rolePermissions.map((rolePermission: RolePermission, index: number) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="r-row-child no-padding-container">
                                                                        <div className="row">
                                                                            <div className="r-row-child roles-permissions-detail-permission-name">
                                                                                {rolePermission.permission.displayName}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="r-row-child no-padding-container">
                                                                        <div className="row">
                                                                            <div className="r-row-child">
                                                                                {rolePermission.permission.description}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    : null }
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default RolePermissionFieldArray;