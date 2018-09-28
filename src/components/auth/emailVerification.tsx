import React from 'react'
import { Wrapper } from '@reperio/ui-components';

const EmailVerification = (props: any) => (
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