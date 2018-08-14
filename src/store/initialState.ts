export class State {
    authSession: StateAuthSession;
    users: StateUsers;
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
    }
};
