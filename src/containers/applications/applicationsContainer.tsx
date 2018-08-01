import React from 'react';
import {DropdownButton} from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from '../../store/initialState';
import { getAllApplications } from '../../actions/applicationActions';

class ApplicationsContainer extends React.Component {
    props: any;

    async componentDidMount() {
        await this.props.actions.getAllApplications();
    }

    render() {
        return (
            <div>
                {this.props.authSession.isAuthenticated && this.props.applications.applications != null ?
                    <DropdownButton className="r-applications-container"
                                    id="applications"
                                    title={
                                        <div className="r-applications" >
                                            <div className="r-applications-squares">
                                                <div className="r-applications-top-left-square r-applications-square"></div>
                                                <div className="r-applications-square"></div>
                                                <div className="r-applications-square"></div>
                                                <div className="r-applications-square"></div>
                                            </div>
                                        </div>
                                    }
                                    noCaret>
                        <span className="r-applications-container-content">
                            {this.props.applications.applications.map((application: any, index: number) => {
                                return (<div key={index}>{application.name}</div>)
                            })}
                        </span>
                    </DropdownButton> 
                : null }
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {
        authSession: state.authSession,
        applications: state.applications
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({getAllApplications}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ApplicationsContainer);