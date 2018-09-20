export class State {
    authSession: StateAuthSession;
    users: StateUsers;
    userManagement: StateUserManagement;
    permissions: StatePermissions;
    permissionManagement: StatePermissionManagement;
    roles: StateRoles;
    roleManagement: StateRoleManagement;
}

export class StateAuthSession {
    isPending: boolean;
    isAuthenticated: boolean;
    isError: boolean;
    errorMessage: string;
    user: any;
}

export class StateUsers {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    users: any[];
}

export class StateUserManagement {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    initialUser: any;
    organizations: any[];
}
export class StatePermissions {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    permissions: any[];
}

export class StatePermissionManagement {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    initialPermission: any;
}

export class StateRoles {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    roles: any[];
}

export class StateRoleManagement {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    initialRole: any;
    permissions: any[];
}

export const initialState: State = {
    authSession: {
        isPending: false,
        isAuthenticated: false,
        isError: false,
        errorMessage: null,
        user: null
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
        organizations: []
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
    }
};