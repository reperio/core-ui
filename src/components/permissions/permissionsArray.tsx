import {ButtonElement} from '@reperio/ui-components';
import React from 'react';
import Dropdown from '../../models/dropdown';

interface PermissionsArrayProps {
    togglePermissionDetails(index: number): void;
    removePermission(index: number): void;
    initialValues: Dropdown[];
    toggle: boolean;
}

const PermissionsArray: React.SFC<PermissionsArrayProps> = (props: PermissionsArrayProps) => {
    return (
        <div>
            <hr />
            {props.initialValues.map((member:any, index:number) =>
                <div key={index}>
                    <div className="row" onClick={() => props.toggle ? props.togglePermissionDetails(index) :  null}>
                        <div className="col-xs-8">
                            {props.initialValues[index].label}
                        </div>
                        <div className="col-xs-4">
                            <ButtonElement type="button" color="danger" text="Remove" onClick={() => props.removePermission(index)} />
                        </div>
                    </div>
                    <div className="row">
                        <hr />
                    </div>
                </div>
            )}
        </div>
    )
};

export default PermissionsArray;