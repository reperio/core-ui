import React from 'react'
import { Wrapper } from '@reperio/ui-components';

interface EmailVerificationProps {
    response: boolean;
}

const EmailVerification = (props: EmailVerificationProps) => (
    <div className="r-wrapper-container">
        <Wrapper>
            <div className="row">
                <div className="r-row-child">
                    {props.response == true ? 'Email verified' : null}
                    {props.response == false ? 'Link expired' : null}
                </div>
            </div>
        </Wrapper>
    </div>
);

export default EmailVerification;