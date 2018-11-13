import Role from "../models/role";
import Organization from "../models/organization";
import User from "../models/user";
import Permission from "../models/permission";
import Application from "../models/application";

export class State {
    authSession: StateAuthSession;
    users: StateUsers;
    userManagement: StateUserManagement;
    permissions: StatePermissions;
    permissionManagement: StatePermissionManagement;
    roles: StateRoles;
    roleManagement: StateRoleManagement;
    organizations: StateOrganizations;
    organizationManagement: StateOrganizationManagement;
    applications: StateApplications;
}

export class StateAuthSession {
    isAuthInitialized: boolean;
    isPending: boolean;
    isAuthenticated: boolean;
    isError: boolean;
    errorMessage: string;
    user: User;
    reperioCoreJWT: string;
}

export class StateUsers {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    users: User[];
}

export class StateUserManagement {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    initialUser: User;
    user: User;
}
export class StatePermissions {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    permissions: Permission[];
}

export class StatePermissionManagement {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    initialPermission: Permission;
}

export class StateRoles {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    roles: Role[];
}

export class StateRoleManagement {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    initialRole: Role;
    permissions: Permission[];
}

export class StateOrganizations {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    organizations: Organization[];
}

export class StateOrganizationManagement {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    initialOrganization: Organization;
    users: User[];
}

export class StateApplications {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    applications: Application[];
}

export const initialState: State = {
    authSession: {
        isAuthInitialized: false,
        isPending: false,
        isAuthenticated: false,
        isError: false,
        errorMessage: null,
        user: null,
        reperioCoreJWT: null
    },
    users: {
        isPending: false,
        isError: false,
        errorMessage: null,
        users: []
    },
    userManagement: {
        isPending: false,
        isError: false,
        errorMessage: null,
        initialUser: null,
        user: null
    },
    permissions: {
        isPending: false,
        isError: false,
        errorMessage: null,
        permissions: []
    },
    permissionManagement: {
        isPending: false,
        isError: false,
        errorMessage: null,
        initialPermission: null
    },
    roles: {
        isPending: false,
        isError: false,
        errorMessage: null,
        roles: []
    },
    roleManagement: {
        isPending: false,
        isError: false,
        errorMessage: null,
        initialRole: null,
        permissions: []
    },
    organizations: {
        isPending: false,
        isError: false,
        errorMessage: null,
        organizations: []
    },
    organizationManagement: {
        isPending: false,
        isError: false,
        errorMessage: null,
        initialOrganization: null,
        users: []
    },
    applications: {
        isPending: false,
        isError: false,
        errorMessage: null,
        applications: []
    }
};