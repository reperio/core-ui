import React from 'react'
import {Wrapper} from '@reperio/ui-components';
import { StateAuthSession } from '../store/initialState';

interface MainDashboardProps {
    authSession: StateAuthSession;
}

const MainDashboard = (props: MainDashboardProps) => (
    <div className="r-wrapper-container">
        <Wrapper flexColumnDirection={true}>
            <div className="row">
                <p>Welcome, {props.authSession.user.primaryEmailAddress}!</p>
            </div>
        </Wrapper>  
    </div>
);

export default MainDashboard;