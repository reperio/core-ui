import * as React from 'react';
import { mount } from 'enzyme';
import OrganizationFieldArray from '../organizationFieldArray';
import { ButtonElement } from '@reperio/ui-components';
import { Organization } from '@reperio/core-connector';

it('Checks to see clicking delete button calls removeOrganization with 1 param', () => {
    const initialValues: Organization[] = [
        {
            id: "966f4157-934c-45e7-9f44-b1e5fd8b79a7",
            name: "Test Organization",
            personal: true,
            userOrganizations: [
                {
                    organization: {id: "966f4157-934c-45e7-9f44-b1e5fd8b79a7", name: "Test Organization", personal: true, userOrganizations: [], organizationAddress: [], supportNumber: '513-123-4567'},
                    organizationId: "966f4157-934c-45e7-9f44-b1e5fd8b79a7",
                    user: null,
                    userId: "d08a1f76-7c4a-4dd9-a377-83ffffa752f4"
                },
                {
                    organization: {id: "fbcb4a99-1fe0-4fec-b5f7-64efbeeb1893", name: "bbbb", personal: false, userOrganizations: [], organizationAddress: [], supportNumber: '513-123-4567'},
                    organizationId: "fbcb4a99-1fe0-4fec-b5f7-64efbeeb1893",
                    user: null,
                    userId: "d08a1f76-7c4a-4dd9-a377-83ffffa752f4"
                }
            ],
            organizationAddress: [], 
            supportNumber: '513-123-4567'
        }
    ];

    const mockDelete = jest.fn();
    const wrapper = mount(
        <OrganizationFieldArray removeOrganization={mockDelete} 
                                initialValues={initialValues} 
                                active={true} />
                    );

    wrapper.find(ButtonElement).at(0).simulate('click');
    expect(mockDelete).toHaveBeenCalledWith(0);

});