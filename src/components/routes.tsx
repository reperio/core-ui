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
import permissionManagementContainer from "../containers/permissions/permissionManagementContainer";
import permissionsContainer from "../containers/permissions/permissionsContainer";
import roleManagementContainer from "../containers/roles/roleManagementContainer";
import rolesContainer from "../containers/roles/rolesContainer";
import roleCreateFormContainer from "../containers/roles/roleCreateFormContainer";
import emailVerificationContainer from "../containers/emailVerificationContainer";
import organizationsContainer from "../containers/organizations/organizationsContainer";
import organizationManagementContainer from "../containers/organizations/organizationManagementContainer";
import organizationCreateFormContainer from "../containers/organizations/organizationCreateFormContainer";

const Routes = () => (
    <div className="app-content">
        <Switch>
            <PrivateRouteContainer exact path="/home" component={MainDashboardContainer} />
            <PrivateRouteContainer exact path="/users" component={usersContainer} />
            <PrivateRouteContainer exact path="/users/new" component={userCreateFormContainer} />
            <PrivateRouteContainer exact path="/users/:userId/edit" component={userManagementFormContainer} />
            <PrivateRouteContainer exact path="/userCreate" component={userCreateFormContainer} />
            <PrivateRouteContainer exact path="/userManagement" component={userManagementFormContainer} />
            <PrivateRouteContainer exact path="/roles" component={rolesContainer} />
            <PrivateRouteContainer exact path="/roles/:roleId/edit" component={roleManagementContainer} />
            <PrivateRouteContainer exact path="/roles/new" component={roleCreateFormContainer} />
            <PrivateRouteContainer exact path="/permissions" component={permissionsContainer} />
            <PrivateRouteContainer exact path="/permissions/:permissionId/edit" component={permissionManagementContainer} />
            <PrivateRouteContainer exact path="/organizations" component={organizationsContainer} />
            <PrivateRouteContainer exact path="/organizations/:organizationId/edit" component={organizationManagementContainer} />
            <PrivateRouteContainer exact path="/organizations/new" component={organizationCreateFormContainer} />
            <PublicRouteContainer exact path="/login" component={LoginFormContainer} />
            <PublicRouteContainer exact path="/signup" component={SignupFormContainer} />
            <PublicRouteContainer exact path="/emailVerification/:token" component={emailVerificationContainer} />
            <Route>
                <Redirect to="/home"/>
            </Route>
        </Switch>
    </div>
);

export default Routes;