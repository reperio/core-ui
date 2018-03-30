import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import "./styles/app.scss"

import { store } from "./store/store"
import { history } from "./store/history"
import App from './components/app'
import * as authActions from "./actions/authActions";

async function load() {
    try {
        const authToken = window.localStorage.getItem("authToken");
        if (authToken != null) {
            await authActions.setAuthToken(authToken, true)(store.dispatch);
        }
    } catch (e) {
        if (e.response == null || (e.response.status !== 401 && e.response.status !== 403)) {
            console.error("An error occurred while trying to get the logged in user from the saved auth token", e);
        }
    }

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
}

load();