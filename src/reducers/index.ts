import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { usersReducer } from "./usersReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    users: usersReducer
});
