import React from 'react'
import {connect} from "react-redux";
import Routes from "../components/routes";
import {TitleBar, ApplicationMenuItem } from '@reperio/ui-components'
import { logout, setAuthToken } from '../actions/authActions';
import { State } from '../store/initialState';
import { bindActionCreators } from '../../node_modules/redux';
import NavMenuContainer from "./navMenuContainer";
import {AuthConnector} from 'reperio-core-connector'

declare const CORE_AUTH_UI_URL: string;

class AppContainer extends React.Component {
    props: any;

    logout() {
        this.props.actions.logout();
    };

    render() {
        return (
            <AuthConnector url={"http://localhost:8081/auth"}
                           loginUrl={CORE_AUTH_UI_URL}
                           isAuthInitialized={this.props.authSession.isAuthInitialized}
                           authToken={this.props.authSession.reperioCoreJWT}
                           setAuthToken={this.props.actions.setAuthToken}>
                <div className="app-main">
                    <NavMenuContainer/>
                    <div className="page-container">
                        <TitleBar
                            isAuthenticated={this.props.authSession.isAuthenticated}
                            profile={this.props.authSession.isAuthenticated ? {
                                initials: `${this.props.authSession.user.firstName.charAt(0).toUpperCase()}${this.props.authSession.user.lastName.charAt(0).toUpperCase()}`,
                                name: `${this.props.authSession.user.firstName} ${this.props.authSession.user.lastName}`,
                                accountName: 'Reper.io',
                                phone: '1234567890',
                                email: `${this.props.authSession.user.primaryEmailAddress}`,
                                onLogout: this.logout.bind(this)
                            }: null}
                            applicationMenuItems={[
                                <ApplicationMenuItem key="1" name="Example1" label="Example" />,
                                <ApplicationMenuItem key="2" name="Exmaple2" label="Example 2" />,
                                <ApplicationMenuItem key="3" name="Nic Cage" image="https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SX425_.jpg" />,
                                <ApplicationMenuItem key="4" name="Nic Cage" image="https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SX425_.jpg" />,
                                <ApplicationMenuItem key="5" name="Nic Cage" image="https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SX425_.jpg" />
                            ]} />
                        <Routes/>
                    </div>
                </div>
            </AuthConnector>
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
        actions: bindActionCreators({logout, setAuthToken}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps, null, {pure: false})(AppContainer);