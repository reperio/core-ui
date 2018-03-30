import React from 'react'

const MainDashboard = (props: any) => (
    <div>
        <p>Welcome, {props.authSession.user.email}!</p>
    </div>
);

export default MainDashboard;