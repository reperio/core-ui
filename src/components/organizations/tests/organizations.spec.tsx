import * as React from 'react';
import { mount } from 'enzyme';
import Organizations from '../organizations';
import { Organization } from '@reperio/core-connector';

const orgData : Organization[] = [
    {
        id: "966f4157-934c-45e7-9f44-b1e5fd8b79a7",
        name: "Test Organization",
        personal: true,
        userOrganizations: [
            {
                userId: '',
                organizationId: '',
                user:  null,
                organization: null,
            }
        ],
        organizationAddress: [], 
        supportNumber: '513-123-4567'
    }
];

it('Checks to see if organization create button calls a function', () => {
    const mockCreate = jest.fn();
    const wrapper = mount(
        <Organizations  navigateToManagement={() => {}} 
                        navigateToCreate={mockCreate} 
                        gridData={[]}
                        pages={0} />
                    );

    wrapper.find('button').at(0).simulate('click');
    expect(mockCreate).toHaveBeenCalled();
});

it('Checks if grid has data in it', () => {


    const wrapper = mount(
        <Organizations  navigateToManagement={() => {}} 
                        navigateToCreate={() => {}} 
                        gridData={orgData}
                        pages={0} />
                    );

    expect(wrapper.find('.rt-td').first().text()).toEqual(orgData[0].name);
});

it('Check if clicking row calls function', () => {
    const mockManage = jest.fn();
    const wrapper = mount(
        <Organizations  navigateToManagement={mockManage} 
                        navigateToCreate={() => {}} 
                        gridData={orgData}
                        pages={0} />
                    );

    wrapper.find('.rt-td').first().simulate('click');
    expect(mockManage).toHaveBeenCalled();
});