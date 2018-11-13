import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import "./styles/app.scss"

import { store } from "./store/store"
import { history } from "./store/history"
import AppContainer from './containers/appContainer'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppContainer/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);