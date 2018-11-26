import React from 'react'

interface Props {
    url: string;
    name: string;
    isAuthInitialized: boolean;
    setAuthToken(token: string): Promise<any>;
    initializeAuth(): Promise<any>;
}

class AuthConnector extends React.Component<Props> {
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

        await this.props.setAuthToken(value);
        await this.props.initializeAuth();
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
                {this.props.isAuthInitialized ? this.props.children : null}
                <iframe src={this.props.url}
                        name={this.props.name}
                        ref={element => this.element = element}
                        style={{display: "none"}}/>
            </React.Fragment>
        );
    }
}

export default AuthConnector;