import * as React from 'react';
import { mount } from 'enzyme';
import SignupForm from '../signupForm';
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

test('Checks to see submit button works', () => {
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(SignupForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  authSession={authSession}
                        recaptcha={true}
                        children={null}
                        onSubmit={submit} />
        </Provider>);

    wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Sign Up').at(0).simulate('submit');
    expect(submit).toBeCalled();
});

test('Checks to see if recaptcha is false, submit button should be disabled', () => {
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(SignupForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  authSession={authSession}
                        recaptcha={false}
                        children={null}
                        onSubmit={submit} />
        </Provider>);


    expect(wrapper.find(ButtonElement).props().disabled).toEqual(true);
});

test('Checks to see if recaptcha is true, submit button should be enabled', () => {
    const submit = jest.fn();

    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(SignupForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  authSession={authSession}
                        recaptcha={true}
                        children={null}
                        onSubmit={submit} />
        </Provider>);


    expect(wrapper.find(ButtonElement).props().disabled).toEqual(false);
});