import * as React from 'react';
import { mount } from 'enzyme';
import LoginForm from '../loginForm';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reduxForm } from 'redux-form';
import { ButtonElement } from '@reperio/ui-components';
import { StateAuthSession } from '../../../store/initialState';

const authSession: StateAuthSession = {
    user: null,
    errorMessage: null,
    isAuthenticated: true,
    isError: false,
    isPending: false
};

test('Checks to see forgot password button works', () => {
    const mockNavigate = jest.fn();
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(LoginForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToForgotPassword={mockNavigate}
                        authSession={authSession}
                        onSubmit={() => {}} />
        </Provider>);

    wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Forgot Password').at(0).simulate('click');
    expect(mockNavigate).toHaveBeenCalledWith();
});

test('Checks to see submit button works', () => {
    const mockNavigate = jest.fn();
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(LoginForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToForgotPassword={mockNavigate}
                        authSession={authSession}
                        onSubmit={submit} />
        </Provider>);

    wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Sign In').at(0).simulate('submit');
    expect(submit).toBeCalled();
});