import React from 'react'
import NavMenuContainer from "../containers/navMenuContainer";
import AppContainer from '../containers/appContainer';

const App = () => (
    <div className="app-main">
        <NavMenuContainer/>
        <AppContainer />
    </div>
);

export default App;