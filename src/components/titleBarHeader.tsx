import React from 'react'
import {Route, Switch} from "react-router-dom";

const TitleBarHeader = () => (
    <Switch>
        <Route exact path="/home" component={() => <div>Home</div>} />
        <Route exact path="/users" component={() => <div>Users</div>} />
        <Route exact path="/users/new" component={() => <div>Create User</div>} />
        <Route exact path="/users/:userId/edit" component={() => <div>Manage User</div>} />
        <Route exact path="/roles" component={() => <div>Roles</div>} />
        <Route exact path="/roles/:roleId/edit" component={() => <div>Manage Role</div>} />
        <Route exact path="/roles/new" component={() => <div>Create Role</div>} />
        <Route exact path="/permissions" component={() => <div>Permissions</div>} />
        <Route exact path="/permissions/:permissionName/edit" component={() => <div>Manage Permission</div>} />
        <Route exact path="/organizations" component={() => <div>Organizations</div>} />
        <Route exact path="/organizations/:organizationId/edit" component={() => <div>Manage Organization</div>} />
        <Route exact path="/organizations/new" component={() => <div>Create Organization</div>} />
        <Route exact path="/error" component={() => <div>Error</div>} />
    </Switch>
);

export {TitleBarHeader};