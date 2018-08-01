export class State {
    authSession: StateAuthSession;
    applications: StateApplication;
}

export class StateAuthSession {
    isPending: boolean;
    isAuthenticated: boolean;
    isError: boolean;
    errorMessage: string;
    user: any;
}

export class StateApplication {
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
    applications: any[];
}


export const initialState: State = {
    authSession: {
        isPending: false,
        isAuthenticated: false,
        isError: false,
        errorMessage: null,
        user: null
    },
    applications: {
        isPending: false,
        isError: false,
        errorMessage: null,
        applications: null
    }
};
