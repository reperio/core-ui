import React from 'react'
import {connect} from "react-redux";
import NavMenu from "../components/navMenu/navMenu";
import { State } from '../store/initialState';

class NavMenuContainer extends React.Component {
    props: any;

    render() {
        return (
            <div className="r-nav-menu">
                <NavMenu authSession={this.props.authSession} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

export default connect(mapStateToProps, null)(NavMenuContainer);