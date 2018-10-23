import React from 'react'
import {Wrapper, ButtonElement} from '@reperio/ui-components';

interface ErrorProps {
    goHome(): void;
}

const Error = (props: ErrorProps) => {
    return (
        <div className="r-wrapper-container">
            <Wrapper flexColumnDirection={true}>
                <div className="row">
                    Something went wrong
                </div>
                <div className="row">
                    <div className="r-row-child">
                        <ButtonElement text="Go Home" color="neutral" onClick={() => props.goHome()} />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Error;