import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { usersReducer } from "./usersReducer";
import { userManagementReducer } from "./userManagementReducer";

export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    users: usersReducer,
    userManagement: userManagementReducer
});
