import React, { ComponentType } from 'react';
import {connect} from "react-redux";
import {Redirect, Route, RouteComponentProps} from 'react-router';
import queryString from 'query-string';

import { State } from '../store/initialState';
import RedirectToLogin from "../components/redirectToLogin";
import {submitAuthWithOTP} from "../actions/authActions";
import {bindActionCreators} from "redux";

interface OwnProps {
    path: string;
    exact: boolean;
    component: ComponentType<any>;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}
interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

type Props = RouteComponentProps<any> & StateProps & DispatchProps & OwnProps;

class RouteContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOTP();
    }

    componentDidUpdate() {
        this.handleOTP();
    }

    render() {
        const {otp, ...queryParams} = queryString.parse(this.props.location.search);

        if (otp != null) {
            if (this.props.authSession.otpIsError) {
                return (<RedirectToLogin />);
            } else {
                return null;
            }
        }
        else if (!this.props.authSession.isAuthenticated) {
            return (<RedirectToLogin />);
        } else {
            return (<Route {...this.props} />);
        }
    }

    handleOTP() {
        const {otp, ...queryParams} = queryString.parse(this.props.location.search);

        if (otp != null && !this.props.authSession.otpIsPending && !this.props.authSession.otpIsError) {
            this.props.actions.submitAuthWithOTP(otp as string, this.props.location.pathname);
        }
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({submitAuthWithOTP}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(RouteContainer) as any;