import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import { authSessionReducer } from "./authSessionReducer"
import { applicationReducer } from "./applicationReducer"


export const rootReducer = combineReducers({
    form: formReducer,
    authSession: authSessionReducer,
    applications: applicationReducer
});
