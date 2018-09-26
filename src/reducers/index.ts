import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { usersReducer } from "./usersReducer";
import { userManagementReducer } from "./userManagementReducer";
import { permissionsReducer } from "./permissionsReducer"
import { permissionManagementReducer } from "./permissionManagementReducer";
import { rolesReducer } from "./rolesReducer"
import { roleManagementReducer } from "./roleManagementReducer";
import { organizationsReducer } from "./organizationsReducer";
import { organizationManagementReducer } from "./organizationManagementReducer";
import { applicationsReducer } from "./applicationsReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    users: usersReducer,
    userManagement: userManagementReducer,
    permissions: permissionsReducer,
    permissionManagement: permissionManagementReducer,
    roles: rolesReducer,
    roleManagement: roleManagementReducer,
    organizations: organizationsReducer,
    organizationManagement: organizationManagementReducer,
    applications: applicationsReducer
});
