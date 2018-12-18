import * as React from 'react';
import { mount } from 'enzyme';
import OrganizationCreateForm from '../organizationCreateForm';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { ButtonElement } from '../../../../node_modules/@reperio/ui-components';

describe('', function(){
    const users = [{
        firstName: 'abc',
        lastName: '123',
        primaryEmailAddress: 'test@test.com',
        id: '1'
    }];

    it('Checks to see dropdown in component contains values', () => {
        const submit = jest.fn();
        const Decorated = reduxForm({ 
            form: 'testForm', onSubmit: submit
        })(OrganizationCreateForm);
    
        const store = createStore((state) => state)
        const wrapper = mount(
            <Provider store={store}>
                <Decorated users={users} />
            </Provider>);
        
        expect(wrapper.find(Field).last().prop('options')).toEqual([{"label": "abc 123 - test@test.com", "value": "1"}]);
    });
    
    it('Checks to see if create organization submit button works', () => {
        const submit = jest.fn();
        const Decorated = reduxForm({ 
            form: 'testForm', onSubmit: submit
        })(OrganizationCreateForm);
    
        const store = createStore((state) => state)
        const wrapper = mount(
            <Provider store={store}>
                <Decorated  users={users} 
                            onSubmit={submit}/>
            </Provider>);
        
        wrapper.find(ButtonElement).filterWhere(x => x.text() == 'Create Organization').simulate('submit');
        expect(submit).toHaveBeenCalled();
    });
});
