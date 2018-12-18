import * as React from 'react';
import { mount } from 'enzyme';
import PermissionManagementForm from '../permissionManagementForm';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reduxForm } from 'redux-form';
import { ButtonElement } from '@reperio/ui-components';
import Moment from 'moment';
import { Permission } from '@reperio/core-connector';

const permission: Permission = {
    description: "Allows for viewing all users",
    displayName: "View Users",
    isSystemAdminPermission: false,
    lastModified: Moment("2018-11-07T18:11:10.000Z").toDate(),
    name: "ViewUsers",
    rolePermissions: [
        {
            permissionName: "ViewUsers",
            role: {
                id: "e37c87b4-b92e-11e8-96f8-529269fb1459",
                name: "Core Super Admin",
                organization: null,
                rolePermissions: [],
                visible: true,
                organizationId: "966f4157-934c-45e7-9f44-b1e5fd8b79a7"
            },
            roleId: "e37c87b4-b92e-11e8-96f8-529269fb1459",
            permission: null
        }
    ]
}

test('Checks to see cancel button works', () => {
    const mockNavigate = jest.fn();

    const submit = jest.fn();
    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(PermissionManagementForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToPermissions={mockNavigate}
                        removePermission={() => {}}
                        canUpdatePermissions={true}
                        errorMessage={null}
                        initialValues={permission}
                        isError={false}
                        onSubmit={() => {}} />
        </Provider>);

    wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Cancel').at(0).simulate('click');
    expect(mockNavigate).toHaveBeenCalledWith();
});

test('Checks to see submitting form passes correct params', () => {
    const submit = jest.fn();
    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(PermissionManagementForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToPermissions={() => {}}
                        removePermission={() => {}}
                        canUpdatePermissions={true}
                        errorMessage={null}
                        initialValues={permission}
                        isError={false}
                        onSubmit={submit} />
        </Provider>);

    wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Save').at(0).simulate('submit');
    expect(submit).toHaveBeenCalled();
});

test('Checks to see if canUpdatePermissions is false, save button disappears', () => {
    const submit = jest.fn();
    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(PermissionManagementForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToPermissions={() => {}}
                        removePermission={() => {}}
                        canUpdatePermissions={false}
                        errorMessage={null}
                        initialValues={permission}
                        isError={false}
                        onSubmit={() => {}} />
        </Provider>);

    expect(wrapper.find(ButtonElement).findWhere(x=> x.text() == 'Save').length).toEqual(0);
});

test('Checks to see if not having permission to update will disabled form fieldsets', () => {
    const submit = jest.fn();
    const Decorated = reduxForm({ 
        form: 'testForm', onSubmit: submit
    })(PermissionManagementForm);

    const store = createStore((state) => state)
    const wrapper = mount(
        <Provider store={store}>
            <Decorated  navigateToPermissions={() => {}}
                        removePermission={() => {}}
                        canUpdatePermissions={false}
                        errorMessage={null}
                        initialValues={permission}
                        isError={false}
                        onSubmit={() => {}} />
        </Provider>);

    let disabled = true;
    wrapper.find('fieldset').forEach(x => {
        if (x.prop('disabled') == false) {
            disabled = false;
        }
    });

    expect(disabled).toEqual(true);
});