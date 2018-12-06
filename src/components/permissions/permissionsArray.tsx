import {ButtonElement} from '@reperio/ui-components';
import React from 'react';
import Dropdown from '../../models/dropdown';
import { Permission } from '@reperio/core-connector';

interface PermissionsArrayProps {
    togglePermissionDetails(index: number): void;
    removePermission(index: number): void;
    canUpdateRoles: boolean;
    initialValues: Permission[];
    toggle: boolean;
}

const PermissionsArray: React.SFC<PermissionsArrayProps> = (props: PermissionsArrayProps) => {
    return (
        <div>
            <div className="r-row-child">
                {props.initialValues.map((permission:Permission, index:number) =>
                    <div key={index}>
                        <hr />
                        <div className="r-row-child">
                            <div className="row" onClick={() => props.toggle ? props.togglePermissionDetails(index) :  null}>
                                <div className="r-row-child">
                                    {permission.name}
                                </div>
                                <div className="r-row-child">
                                    {props.canUpdateRoles ? 
                                        <ButtonElement type="button" color="danger" text="Remove" onClick={() => props.removePermission(index)} />
                                    : null }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PermissionsArray;