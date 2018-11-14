import * as React from 'react';
import { mount } from 'enzyme';
import EmailVerification from '../emailVerification';

test('Checks to see clicking delete button calls removePermission with 1 param', () => {
    const wrapper = mount(
        <EmailVerification response={true} />
    );
     
    expect(wrapper.find('.r-row-child').text()).toEqual('Email verified');
});

test('Checks to see if not having updateRole permission hides delete button', () => {
    const mockDelete = jest.fn();
    const wrapper = mount(
        <EmailVerification response={false}/>
    );
     
    expect(wrapper.find('.r-row-child').text()).toEqual('Link expired');
}); 

test('Checks to see if not having updateRole permission hides delete button', () => {
    const mockDelete = jest.fn();
    const wrapper = mount(
        <EmailVerification response={null}/>
    );
     
    expect(wrapper.find('.r-row-child').text()).toEqual('');
}); 