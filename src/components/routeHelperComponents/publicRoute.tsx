import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = (props: any) => {
    if (props.isAuthenticated && props.path != ("/emailVerification/:token" && '/resetPassword/:token')) {
        return (<Redirect to="/home" />);
    } else {
        return (<Route {...props} />);
    }
};

export default PublicRoute;