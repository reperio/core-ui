import React from 'react'
import { Wrapper } from '@reperio/ui-components';

const UserManagementProfile = (props: any) => (
    <div className={`${props.top ? 'row management-top' : 'row'}`}>
        <Wrapper>
            <div className="r-wrapper-child">
            {props.initialValues ? 
                <div style={{display: 'flex'}}>
                    <div className="r-row-child">
                        <div className="profile-circle">
                            {props.initialValues.firstName.charAt(0).toUpperCase()}{props.initialValues.lastName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="r-row-child">
                        <div className="row management-name">
                                {props.initialValues.firstName} {props.initialValues.lastName}
                        </div>
                        <div className="row profile-primaryEmailAddress">
                            {props.initialValues.primaryEmailAddress}
                        </div>
                    </div>
                </div>
            : null}
            </div>
        </Wrapper>
    </div>
)

export default UserManagementProfile;