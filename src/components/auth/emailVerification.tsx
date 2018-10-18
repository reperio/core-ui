import React from 'react'
import { Wrapper } from '@reperio/ui-components';

interface EmailVerificationProps {
    response: boolean;
}

const EmailVerification = (props: EmailVerificationProps) => (
    <form>
        <div className="row">
            <Wrapper>
                <div className="col-xs-12">
                    <p>
                        {props.response == true ? 'Email verified' : null}
                        {props.response == false ? 'Link expired' : null}
                    </p>
                </div>
            </Wrapper>
        </div>
    </form>
);

export default EmailVerification;