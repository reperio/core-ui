import React from 'react'
import NavMenuContainer from "../containers/navMenuContainer";
import Routes from "./routes";

const App = () => (
    <div className="app-main">
        <NavMenuContainer/>
        <Routes/>
    </div>
);

export default App;