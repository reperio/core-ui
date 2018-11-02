import React from 'react'
import { Wrapper, ButtonElement } from '@reperio/ui-components';

interface UserManagementControlsProps {
    navigateToUsers(): void;
    right: boolean;
    children: JSX.Element;
}

const UserManagementControls: React.SFC<UserManagementControlsProps> = (props: UserManagementControlsProps) => (
    <div className={`${props.right ? 'management-right' : 'row management-controls-bottom'}`}>
        {props.children}
        <div className="row">
            <Wrapper>
                <div className="row management-submission-controls-container">
                    <div className="r-row-child management-submission-controls">
                        <ButtonElement type="button" color="cancel" wide text="Back" onClick={() => props.navigateToUsers()} />
                    </div>
                </div>
            </Wrapper>
        </div>
    </div>
)

export default UserManagementControls;