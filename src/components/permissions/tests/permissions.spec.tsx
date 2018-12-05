import * as React from 'react';
import { mount } from 'enzyme';
import Permissions from '../permissions';
import { Permission } from '@reperio/core-connector';

const initialValues: Permission[] = [{
    description: 'This is a test',
    displayName: 'Test',
    isSystemAdminPermission: false,
    lastModified: null,
    name: 'Test',
    rolePermissions: []
}];

test('Checks if grid has data in it', () => {
    const wrapper = mount(
        <Permissions    navigateToManagement={() => {}}
                        gridData={initialValues} />
                    );

    expect(wrapper.find('.rt-td').first().text()).toEqual(initialValues[0].name);
});

test('Check if clicking row calls function', () => {
    const mockManage = jest.fn();
    const wrapper = mount(
        <Permissions    navigateToManagement={mockManage}
                        gridData={initialValues} />
                    );

    wrapper.find('.rt-td').first().simulate('click');
    expect(mockManage).toHaveBeenCalled();
});