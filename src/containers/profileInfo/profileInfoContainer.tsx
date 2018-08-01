import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from '../../store/initialState';
import NavMenuLogOutLinkContainer from '../navMenuLogOutLinkContainer';

class ProfileInfoContainer extends React.Component {
    props: any;

    render() {
        return (
            <div>
                {this.props.authSession.isAuthenticated ?
                    <DropdownButton className="r-profile-container"
                                id="profileInfo"
                                title={
                                    <div className="r-profile">
                                        <div className="r-profile-initials">{this.props.authSession.user.firstName.charAt(0) + this.props.authSession.user.lastName.charAt(0)}</div>
                                    </div>
                                }
                                noCaret>
                        <span className="r-profile-content"> 
                            Name<br/>
                            Account<br/>
                            Phone<br/>
                            Email<br/>
                        </span>
                    <MenuItem divider />
                    <NavMenuLogOutLinkContainer/>
                </DropdownButton>: null}
            </div>
        )
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
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(ProfileInfoContainer);