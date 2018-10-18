import React from 'react'
import {connect} from "react-redux";
import {emailVerification} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import { formValueSelector } from 'redux-form';
import EmailVerification from '../../components/auth/emailVerification';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store/initialState';

interface StateProps extends ReturnType<typeof mapStateToProps> {}

interface DispatchProps extends ReturnType<typeof mapActionToProps> {}

class EmailVerificationContainer extends React.Component<RouteComponentProps<any> & StateProps & DispatchProps> {

    async componentDidMount () {
        await this.props.actions.emailVerification(this.props.match.params.token);
    };

    render() {
        return (
            <div>
                <EmailVerification response={this.props.response} />
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('emailVerification');
    return {
        response: selector(state, 'response') as boolean
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({emailVerification}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(EmailVerificationContainer);