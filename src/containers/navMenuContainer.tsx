import React from 'react'
import {connect} from "react-redux";
import NavMenu from "../components/navMenu/navMenu";
import {logout} from "../actions/authActions";
import { bindActionCreators } from '../../node_modules/redux';
import { State } from '../store/initialState';

class NavMenuContainer extends React.Component {
    props: any;
    
    async logout() {
        await this.props.actions.logout();
    };

    render() {
        return (
            <NavMenu    logout={this.logout.bind(this)} 
                        authSession={this.props.authSession} />
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({logout}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(NavMenuContainer);