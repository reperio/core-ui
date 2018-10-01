import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const excludedRoutePaths = ["/emailVerification/:token", "/resetPassword/:token",];

const PublicRoute = (props: any) => {
    if (props.isAuthenticated && !excludedRoutePaths.includes(props.path)) {
        return (<Redirect to="/home" />);
    } else {
        return (<Route {...props} />);
    }
};

export default PublicRoute;