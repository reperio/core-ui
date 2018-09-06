
import { Dispatch } from "react-redux";
import { history } from '../store/history';
import { change } from "redux-form";

export const locationChange = (location: string, payload: any, form: string) => async (dispatch: Dispatch<any>) => {
    if (form && payload) {
        dispatch(change(form, 'payload', payload));
    }
    history.push(location);
};