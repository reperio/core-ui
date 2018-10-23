import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { TextboxElement, ButtonElement, Wrapper } from '@reperio/ui-components';

interface ResetPasswordProps {
    navigateToLogin(): void;
    onSubmit(): void;
    response: boolean;
}

type Form = ResetPasswordProps & InjectedFormProps<any>;

const ResetPasswordForm: React.SFC<Form> = (props: Form) => (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Wrapper>
            {props.response ?
            <div className="r-wrapper-child">
                <div className="row">
                    <h2>Reset password</h2>
                    <hr />
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <label>Password</label>
                        <Field name="password" placeholder="Password" type="password" component={TextboxElement} />
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <label>Confirm Password</label>
                        <Field name="confirmPassword" placeholder="Confirm Password" type="password" component={TextboxElement} />
                    </div>
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <ButtonElement type="submit" name="reset" color="neutral" text="Reset Now" />
                        <ButtonElement type="button" name="cancel" color="danger" text="Cancel" onClick={() => props.navigateToLogin()} />
                    </div>
                </div>
            </div>
            : <div className="r-wrapper-child">Link expired</div>}
        </Wrapper>
    </form>
)

// casted to <any> because reduxForm doesn't play nicely with other things
export default reduxForm({ form: 'resetPasswordForm' })(ResetPasswordForm) as any;