import * as React from 'react';
import { mount } from 'enzyme';
import ForgotPasswordForm from '../forgotPasswordForm';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reduxForm } from 'redux-form';
import { ButtonElement, TextboxElement } from '@reperio/ui-components';

test('Checks to see cancel button works', () => {
    const mockNavigate = jest.fn();
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(ForgotPasswordForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToLogin={mockNavigate}
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
    })(ForgotPasswordForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToLogin={mockNavigate}
                        onSubmit={submit} />
        </Provider>);

    wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Reset Now').at(0).simulate('submit');
    expect(submit).toBeCalled();
});