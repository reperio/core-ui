import axiosStatic from "axios";
import {setAuthToken} from "../actions/authActions"
import { store } from "../store/store";
import {State} from "../store/initialState";

declare const API_URL: string;

export const axios = axiosStatic.create({baseURL: API_URL});

axios.interceptors.request.use(async config => {
    const state: State = store.getState();
    const authToken = state.authSession.reperioCoreJWT;
    if (authToken != null) {
        config.headers.authorization = `Bearer ${authToken}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {
    if (response.headers != null && response.headers.authorization != null && response.headers.authorization.slice(0, 6) === "Bearer") {
        const authToken = response.headers.authorization.slice(7);
        await setAuthToken(authToken)(store.dispatch, store.getState);
    }
    return response;
});