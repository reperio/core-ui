import {Dispatch} from "react-redux";
import {usersActionTypes} from '../actions/usersActions';
import {organizationsActionTypes} from '../actions/organizationsActions';
import {permissionsActionTypes} from '../actions/permissionsActions';
import {rolesActionTypes} from '../actions/rolesActions';

export const clearState = () => (dispatch: Dispatch<any>) => {
    dispatch({type: usersActionTypes.CLEAR_USERS});
    dispatch({type: usersActionTypes.CLEAR_USER_MANAGEMENT});
    dispatch({type: organizationsActionTypes.CLEAR_ORGANIZATIONS});
    dispatch({type: organizationsActionTypes.CLEAR_ORGANIZATION_MANAGEMENT});
    dispatch({type: permissionsActionTypes.CLEAR_PERMISSIONS});
    dispatch({type: permissionsActionTypes.CLEAR_PERMISSION_MANAGEMENT});
    dispatch({type: rolesActionTypes.CLEAR_ROLES});
    dispatch({type: rolesActionTypes.CLEAR_ROLE_MANAGEMENT});
};