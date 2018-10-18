import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Component } from 'react-redux';

const excludedRoutePaths = ["/emailVerification/:token", "/resetPassword/:token", "/error"];

interface PublicRouteProps {
    exact: boolean;
    path: string;
    component: Component<any>;
    isAuthenticated: boolean;
}

const PublicRoute = (props: PublicRouteProps) => {
    if (props.isAuthenticated && !excludedRoutePaths.includes(props.path)) {
        return (<Redirect to="/home" />);
    } else {
        return (<Route {...props} />);
    }
};

export default PublicRoute;