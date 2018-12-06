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
    <div>
        <div className="r-row-child no-padding-container">
            <hr />
            {props.initialValues.map((member:any, index:number) =>
                <div key={index}>
                    <div className="r-row-child">
                        <div className="row">
                            <div className="r-row-child roles-permissions-row" onClick={() => props.toggle && props.active ? props.toggleRoleDetails(index) :  null}>
                                <div className={`fa ${props.active ? props.activeRoleDetailIndex === index ? 'fa-caret-down' : 'fa-caret-right' :''} fa-lg roles-permissions-row-arrow`}></div>
                                {props.organizations.filter((organization: Organization) => organization.id == props.initialValues[index].organizationId)[0].name + ' - ' + props.initialValues[index].name}
                            </div>
                            <div className="r-row-child">
                                {props.active ?
                                    <ButtonElement type="button" color="danger" text="Remove" onClick={() => props.removeRole(index)} />
                                : null }
                            </div>
                        </div>
                        <div className="row">
                            {props.toggle && props.activeRoleDetailIndex === index ? 
                                <div className="r-row-child roles-permissions-detail-container">
                                    <div className="row">
                                        <div className="r-row-child roles-permissions-detail-header">
                                            Permissions
                                        </div>
                                    </div>
                                        {props.initialValues[index].rolePermissions.map((rolePermission: RolePermission, index: number) => {
                                            return (
                                                <div className="row" key={index}>
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
                                                </div>
                                            )
                                        })}
                                    </div>
                            : null }
                            <hr />
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default RolePermissionFieldArray;