import React from 'react'

import { Route, Switch } from "react-router-dom";
import {Redirect} from "react-router";
import RouteContainer from "../containers/routeContainer";
import MainDashboardContainer from "../containers/mainDashboardContainer";
import UsersContainer from '../containers/users/usersContainer';
import UserCreateFormContainer from '../containers/users/userCreateFormContainer';
import UserManagementFormContainer from '../containers/users/userManagementFormContainer';
import PermissionManagementContainer from "../containers/permissions/permissionManagementContainer";
import PermissionsContainer from "../containers/permissions/permissionsContainer";
import RoleManagementContainer from "../containers/roles/roleManagementContainer";
import RolesContainer from "../containers/roles/rolesContainer";
import RoleCreateFormContainer from "../containers/roles/roleCreateFormContainer";
import OrganizationsContainer from "../containers/organizations/organizationsContainer";
import OrganizationManagementContainer from "../containers/organizations/organizationManagementContainer";
import OrganizationCreateFormContainer from "../containers/organizations/organizationCreateFormContainer";
import ErrorContainer from '../containers/errorContainer';

const Routes = () => (
    <div className="app-content">
        <Switch>
            <RouteContainer exact path="/home" component={MainDashboardContainer} />
            <RouteContainer exact path="/users" component={UsersContainer} />
            <RouteContainer exact path="/users/new" component={UserCreateFormContainer} />
            <RouteContainer exact path="/users/:userId/edit" component={UserManagementFormContainer} />
            <RouteContainer exact path="/userCreate" component={UserCreateFormContainer} />
            <RouteContainer exact path="/userManagement" component={UserManagementFormContainer} />
            <RouteContainer exact path="/roles" component={RolesContainer} />
            <RouteContainer exact path="/roles/:roleId/edit" component={RoleManagementContainer} />
            <RouteContainer exact path="/roles/new" component={RoleCreateFormContainer} />
            <RouteContainer exact path="/permissions" component={PermissionsContainer} />
            <RouteContainer exact path="/permissions/:permissionName/edit" component={PermissionManagementContainer} />
            <RouteContainer exact path="/organizations" component={OrganizationsContainer} />
            <RouteContainer exact path="/organizations/:organizationId/edit" component={OrganizationManagementContainer} />
            <RouteContainer exact path="/organizations/new" component={OrganizationCreateFormContainer} />
            <RouteContainer exact path="/error" component={ErrorContainer} />
            <Route>
                <Redirect to="/home"/>
            </Route>
        </Switch>
    </div>
);

export default Routes;