import React from 'react'
import { connect } from "react-redux";
import { formValueSelector } from 'redux-form';
import { bindActionCreators } from "redux";
import ReperioBar from '../../components/misc/reperioBar';
import ReperioBarAnimated from '../../components/misc/reperioBarAnimated';


class ReperioBarContainer extends React.Component {
    props: any;

    render() {
        return (
            <div>
                {this.props.isLoading 
                    ? <ReperioBarAnimated /> 
                    : <ReperioBar />
                }
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const selector = formValueSelector('reperioBar');

    return {
        isLoading: selector(state, 'isLoading')
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ReperioBarContainer);