import {Dispatch} from "react-redux";
import {usersActionTypes} from '../actions/usersActions';
import {rolesActionTypes} from '../actions/rolesActions';
import { submit } from "redux-form";

export const submitForm = (formName: string) => (dispatch: Dispatch<any>) => {
    dispatch(submit(formName));
};