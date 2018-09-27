import React from 'react'
import {Wrapper} from '@reperio/ui-components';

const MainDashboard = (props: any) => (
    <form>
        <div className="row">
            <Wrapper>
                <div className="col-xs-12">
                    <p>Welcome, {props.authSession.user.primaryEmailAddress}!</p>
                </div>
            </Wrapper>
        </div>
    </form>
);

export default MainDashboard;