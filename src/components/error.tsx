import React from 'react'
import {Wrapper, ButtonElement} from '@reperio/ui-components';

interface ErrorProps {
    goHome(): void;
}

const Error = (props: ErrorProps) => {
    return (
        <form>
            <div className="row">
                <Wrapper>
                    <div className="col-xs-12">
                        <div className="row">
                            Something went wrong
                        </div>
                        <div className="row">
                            <ButtonElement text="Go Home" color="neutral" onClick={() => props.goHome()} />
                        </div>
                    </div>
                </Wrapper>
            </div>
        </form>
    );
};

export default Error;