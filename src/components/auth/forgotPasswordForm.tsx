import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';

interface ForgotPasswordProps {
    navigateToLogin(): void;
    onSubmit(): void;
}

type Form = ForgotPasswordProps & InjectedFormProps<any>;

const ForgotPasswordForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Wrapper>
            <div className="r-wrapper-child ">
                <div className="row">
                    <div className="r-row-child">
                        <h2>Forgot password</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <Field name="primaryEmailAddress" placeholder="Primary Email" type="text" component={TextboxElement} />
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <ButtonElement type="submit" name="reset" color="neutral" text="Reset Now" />
                        <ButtonElement type="button" name="cancel" color="danger" text="Cancel" onClick={() => props.navigateToLogin()} />
                    </div>
                </div>
            </div>
        </Wrapper>
    </form>
);

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'forgotPasswordForm' })(ForgotPasswordForm) as any;