import React from 'react'
import { TextboxElement, Wrapper } from '@reperio/ui-components';
import {Field, reduxForm, InjectedFormProps } from 'redux-form';

interface UserManagementProps {
    submit(): void;
}

type Form = UserManagementProps & InjectedFormProps<any>;

const UserManagementGeneralForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.submit)} className="panel-form">
        <Wrapper>
            <div className="r-wrapper-child">
                <div className="row">
                    <div className="r-row-child">
                        <h2>General Information</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <label>First Name</label>
                        <Field name="firstName" placeholder="First Name" type="text" component={TextboxElement} />
                    </div>
                    <div className="r-row-child">
                        <label>Last Name</label>
                        <Field name="lastName" placeholder="Last Name" type="text" component={TextboxElement} />
                    </div>
                </div>
            </div>
        </Wrapper>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userManagementGeneralForm', enableReinitialize: true })(UserManagementGeneralForm) as any; 