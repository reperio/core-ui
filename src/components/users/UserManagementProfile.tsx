import React from 'react'
import { Wrapper } from '@reperio/ui-components';
import { UserViewModel } from '../../models/userViewModel';

interface UserManagementProfileProps {
    userViewModel: UserViewModel,
    top: boolean
}

const UserManagementProfile = (props: UserManagementProfileProps) => (
    <div className={`${props.top ? 'row management-top' : 'row'}`}>
        <Wrapper>
            <div className="r-wrapper-child">
            {props.userViewModel ? 
                <div style={{display: 'flex'}}>
                    <div className="r-row-child">
                        <div className="profile-circle">
                            {props.userViewModel.user.firstName.charAt(0).toUpperCase()}{props.userViewModel.user.lastName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="r-row-child">
                        <div className="row management-name">
                                {props.userViewModel.user.firstName} {props.userViewModel.user.lastName}
                        </div>
                        <div className="row profile-primaryEmailAddress">
                            {props.userViewModel.user.primaryEmailAddress}
                        </div>
                    </div>
                </div>
            : null}
            </div>
        </Wrapper>
    </div>
)

export default UserManagementProfile;