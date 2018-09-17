import React from 'react'

import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router";
import LoginFormContainer from "../containers/loginFormContainer";
import PrivateRouteContainer from "../containers/privateRouteContainer";
import PublicRouteContainer from "../containers/publicRouteContainer";
import MainDashboardContainer from "../containers/mainDashboardContainer";
import SignupFormContainer from '../containers/signupFormContainer';
import usersContainer from '../containers/usersContainer';
import userCreateFormContainer from '../containers/userCreateFormContainer';
import userManagementFormContainer from '../containers/userManagementFormContainer';

const Routes = () => (
    <div className="app-content">
        <Switch>
            <PrivateRouteContainer exact path="/home" component={MainDashboardContainer} />
            <PrivateRouteContainer exact path="/users" component={usersContainer} />
            <PrivateRouteContainer exact path="/users/new" component={userCreateFormContainer} />
            <PrivateRouteContainer exact path="/users/:userId/edit" component={userManagementFormContainer} />
            <PublicRouteContainer exact path="/login" component={LoginFormContainer} />
            <PublicRouteContainer exact path="/signup" component={SignupFormContainer} />
            <Route>
                <Redirect to="/home"/>
            </Route>
        </Switch>
    </div>
);

export default Routes;