import React from 'react'
import {connect} from "react-redux";
import {emailVerification} from "../../actions/authActions";
import {bindActionCreators} from "redux";
import { formValueSelector } from 'redux-form';
import EmailVerification from '../../components/auth/emailVerification';

class EmailVerificationContainer extends React.Component {
    props: any;

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

function mapStateToProps(state: any) {
    const selector = formValueSelector('emailVerification');
    return {
        response: selector(state, 'response')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({emailVerification}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(EmailVerificationContainer);