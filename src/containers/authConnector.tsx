import React from 'react'
import {connect} from "react-redux";
import { setAuthToken, initializeAuth } from '../actions/authActions';
import { State } from '../store/initialState';
import { bindActionCreators } from 'redux';


interface Props {
    url: string;
    name: string;
}

class AuthConnector extends React.Component<Props & StateProps & ActionProps> {
    element: HTMLIFrameElement;

    eventListener = async (e: WindowEventMap["message"]) => {
        const {origin, data} = e;
        const url = new URL(this.props.url);
        if (origin !== url.origin) {
            return;
        }
        const {action, name, value} = data;
        if (action !== "postMessageEnhancer/UPDATED" || name !== "jwt") {
            return;
        }

        await this.props.actions.setAuthToken(value);
        await this.props.actions.initializeAuth();
    };

    componentDidMount() {
        window.addEventListener("message", this.eventListener);

        this.element.addEventListener("load", () => {
            const url = new URL(this.props.url);
            this.element.contentWindow.postMessage({action: "postMessageEnhancer/SUBSCRIBE", subscribeTo: "jwt"}, url.origin);
        });
    }

    componentWillUnmount() {
        window.removeEventListener("message", this.eventListener);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.authSession.isAuthInitialized ? this.props.children : null}
                <iframe src={this.props.url}
                        name={this.props.name}
                        ref={element => this.element = element}
                        style={{display: "none"}}/>
            </React.Fragment>
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
        actions: bindActionCreators({setAuthToken, initializeAuth}, dispatch)
    };
}

type StateProps = ReturnType<typeof mapStateToProps>;
type ActionProps = ReturnType<typeof mapActionToProps>;

export default connect(mapStateToProps, mapActionToProps)(AuthConnector);