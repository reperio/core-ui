import * as React from 'react';
import { mount } from 'enzyme';
import ResetPasswordForm from '../resetPasswordForm';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reduxForm } from 'redux-form';
import { ButtonElement } from '@reperio/ui-components';

test('Checks to see cancel button works', () => {
    const mockNavigate = jest.fn();
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(ResetPasswordForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToLogin={mockNavigate}
                        response={true}
                        onSubmit={() => {}} />
        </Provider>);

    wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Cancel').at(0).simulate('click');
    expect(mockNavigate).toHaveBeenCalledWith();
});

test('Checks to see submit button works', () => {
    const mockNavigate = jest.fn();
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(ResetPasswordForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToLogin={mockNavigate}
                        response={true}
                        onSubmit={submit} />
        </Provider>);

    wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Reset Now').at(0).simulate('submit');
    expect(submit).toBeCalled();
});

test('Checks to see if response is false, Link Expired should be present', () => {
    const mockNavigate = jest.fn();
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(ResetPasswordForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToLogin={mockNavigate}
                        response={false}
                        onSubmit={submit} />
        </Provider>);


    expect(wrapper.find('div').last().text()).toEqual('Link expired');
});