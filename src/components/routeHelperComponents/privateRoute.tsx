import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Component } from 'react-redux';

interface PrivateRouteProps {
    exact: boolean;
    path: string;
    component: Component<any>;
    isAuthenticated: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    if (!props.isAuthenticated) {
        return (<Redirect to="/login" />);
    } else {
        return (<Route {...props} />);
    }
};

export default PrivateRoute;