import React from 'react'
import { TextboxElement, Wrapper, ButtonElement, CheckboxElement } from '@reperio/ui-components';
import {Field, reduxForm, InjectedFormProps, FieldArray } from 'redux-form';
import { UserEmail, User } from '@reperio/core-connector';
import { UserViewModel } from '../../models/userViewModel';

interface UserEmailFieldArrayProps {
    removeEmailAddress(index: number): void;
    sendVerificationEmail(index: number): void;
    setPrimaryEmailAddress(index: number): void;
    active: boolean;
    canDeleteEmail: boolean;
    canSetPrimary: boolean;
    canResendVerificationEmail: boolean;
    initialValues: {
        userEmails: UserEmail[],
        primaryEmailAddress: string
    };
    fields: any[];
}


const userEmailFieldArray: React.SFC<UserEmailFieldArrayProps> = (props: UserEmailFieldArrayProps) => (
    <div className="row">
        <div className="r-row-child no-padding-container">
            {props.fields.map((member:string, index:number) =>
                <div className="row" key={index}>
                    <div className="r-row-child">
                        <Field  disabled={true} 
                                name={`${member}.email`} 
                                placeholder="Email Address" 
                                type="email" 
                                component={TextboxElement} />
                    </div>
                    {props.active ? 
                        <div className="r-row-child">
                        {props.canDeleteEmail ? 
                            <ButtonElement  type="button"
                                            title="Remove Email"
                                            color="danger"
                                            disabled={props.initialValues.userEmails[index] && props.initialValues.userEmails[index].email == props.initialValues.primaryEmailAddress}
                                            children={
                                                <i className="fa fa-trash"></i>
                                            }
                                            onClick={() => props.removeEmailAddress(index)}/>
                        : null }
                        {props.canResendVerificationEmail ? 
                            <ButtonElement  type="button"
                                            title="Send Verification Email"
                                            color="neutral" 
                                            disabled={props.initialValues.userEmails[index] && props.initialValues.userEmails[index].emailVerified == true || !props.initialValues.userEmails[index].id}
                                            children={
                                                <i className="fa fa-paper-plane"></i>
                                            } 
                                            onClick={() => props.sendVerificationEmail(index)}/>
                        : null}
                        {props.canSetPrimary ? 
                            <Field  checked={props.initialValues.userEmails[index].primary == null || !props.initialValues.primaryEmailAddress ? false : props.initialValues.userEmails[index].primary}
                                    disabled={props.initialValues.userEmails[index] && props.initialValues.userEmails[index].emailVerified == false || !props.initialValues.userEmails[index].id}
                                    id={`${index}`}
                                    title="Set As Primary Email Address"
                                    name={`${member}.primary`} 
                                    label="Primary" 
                                    onChange={() => props.setPrimaryEmailAddress(index)}
                                    component={CheckboxElement} />
                        : null}
                        </div>
                    :                     
                        <div className="r-row-child" style={{display: 'flex', alignItems: 'center'}}>
                            {props.initialValues.userEmails[index].primary == null || !props.initialValues.primaryEmailAddress ? false : props.initialValues.userEmails[index].primary ? <i className="fa fa-star"></i> : null}
                        </div>}
                </div>
            )}
        </div>
    </div>
);

interface UserManagementProps {
    submit(): void;
    addEmailAddress(): void;
    removeEmailAddress(): void;
    sendVerificationEmail(): void;
    setPrimaryEmailAddress(): void;
    active: boolean;
    canAddEmails: boolean;
    canDeleteEmail: boolean;
    canResendVerificationEmail: boolean;
    canSetPrimary: boolean;
    initialValues: UserViewModel;
}

type Form = UserManagementProps & InjectedFormProps<any>;

const UserManagementEmailsForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.submit)} className="r-editable-panel-form">
    {props.initialValues ?
        <Wrapper>
            <div className="r-wrapper-child">
                <div className="row">
                    <div className="r-row-child">
                        <h2>Emails</h2>
                    </div>
                </div>
                {props.active && props.canAddEmails ? 
                    <div className="row">
                        <div className="r-row-child">
                            <Field  name="email"
                                    placeholder="Email Address"
                                    component={TextboxElement} />
                        </div>
                        <div className="r-row-child">
                            <ButtonElement type="button" color="neutral" text="Add" onClick={() => {props.addEmailAddress()}} />
                        </div>
                    </div>
                : null}
                <FieldArray name="selectedUserEmails"
                            active={props.active}
                            canDeleteEmail={props.canDeleteEmail}
                            canResendVerificationEmail={props.canResendVerificationEmail}
                            canSetPrimary={props.canSetPrimary}
                            initialValues={{userEmails: props.initialValues.selectedUserEmails, primaryEmailAddress: props.initialValues.user.primaryEmailAddress}}
                            setPrimaryEmailAddress={props.setPrimaryEmailAddress}
                            sendVerificationEmail={props.sendVerificationEmail}
                            removeEmailAddress={props.removeEmailAddress}
                            component={userEmailFieldArray}/>
            </div>
        </Wrapper>
        : null }
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'userManagementEmailsForm', enableReinitialize: true })(UserManagementEmailsForm) as any; 