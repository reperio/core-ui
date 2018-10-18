import React from 'react'
import {Wrapper} from '@reperio/ui-components';
import { StateAuthSession } from '../store/initialState';

interface MainDashboardProps {
    authSession: StateAuthSession;
}

const MainDashboard = (props: MainDashboardProps) => (
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