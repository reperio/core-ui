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
import { CorePermissions } from '@reperio/core-connector';

const Routes = () => (
    <div className="app-content">
        <Switch>
            <RouteContainer exact path="/home" component={MainDashboardContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewUsers]} exact path="/users" component={UsersContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewUsers, CorePermissions.CreateUsers]} exact path="/users/new" component={UserCreateFormContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewUsers]} exact path="/users/:userId/edit" component={UserManagementFormContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewRoles]} exact path="/roles" component={RolesContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewRoles]} exact path="/roles/:roleId/edit" component={RoleManagementContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewRoles, CorePermissions.CreateRoles]} exact path="/roles/new" component={RoleCreateFormContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewPermissions]} exact path="/permissions" component={PermissionsContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewPermissions]} exact path="/permissions/:permissionName/edit" component={PermissionManagementContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewOrganizations]} exact path="/organizations" component={OrganizationsContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewOrganizations]} exact path="/organizations/:organizationId/edit" component={OrganizationManagementContainer} />
            <RouteContainer requiredPermissions={[CorePermissions.ViewOrganizations, CorePermissions.CreateOrganizations]} exact path="/organizations/new" component={OrganizationCreateFormContainer} />
            <RouteContainer exact path="/error" component={ErrorContainer} />
            <Route>
                <Redirect to="/home"/>
            </Route>
        </Switch>
    </div>
);

export default Routes;