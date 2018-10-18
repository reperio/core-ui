import React from 'react'
import {connect} from "react-redux";
import {forgotPassword} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import ForgotPasswordForm from "../../components/auth/forgotPasswordForm";
import { history } from '../../store/history';
import { State } from '../../store/initialState';
import { RouteComponentProps } from 'react-router';

class ForgotPasswordFormValues {
    primaryEmailAddress: string;
}

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class ForgotPasswordFormContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async onSubmit(values: ForgotPasswordFormValues) {
        await this.props.actions.forgotPassword(values.primaryEmailAddress);
    };

    navigateToLogin() {
        history.push('/login');
    }

    render() {
        return (
            <div>
                <ForgotPasswordForm onSubmit={this.onSubmit.bind(this)} 
                                    navigateToLogin={this.navigateToLogin.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return { };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({forgotPassword}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ForgotPasswordFormContainer);