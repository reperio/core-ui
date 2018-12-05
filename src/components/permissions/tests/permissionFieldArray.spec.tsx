import * as React from 'react';
import { mount } from 'enzyme';
import PermissionsArray from '../permissionsArray';
import Dropdown from '../../../models/dropdown';
import { ButtonElement } from '@reperio/ui-components';
import { Permission } from '@reperio/core-connector';

const initialValues: Permission[] = [{
    description: 'This is a test',
    displayName: 'Test',
    isSystemAdminPermission: false,
    lastModified: null,
    name: 'Test',
    rolePermissions: []
}];

test('Checks to see clicking delete button calls removePermission with 1 param', () => {
    const mockDelete = jest.fn();
    const wrapper = mount(
        <PermissionsArray   canUpdateRoles={true}
                            toggle={false}
                            togglePermissionDetails={() => {}}
                            removePermission={mockDelete}
                            initialValues={initialValues} />
                    );

    wrapper.find(ButtonElement).at(0).simulate('click');
    expect(mockDelete).toHaveBeenCalledWith(0);
});

test('Checks to see if not having updateRole permission hides delete button', () => {
    const mockDelete = jest.fn();
    const wrapper = mount(
        <PermissionsArray   canUpdateRoles={false}
                            toggle={false}
                            togglePermissionDetails={() => {}}
                            removePermission={mockDelete}
                            initialValues={initialValues} />
                    );

    
    expect(wrapper.find(ButtonElement).at(0).length).toEqual(0);
});