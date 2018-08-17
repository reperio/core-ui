import React from 'react'
import {connect} from "react-redux";
import {
    cancelSavePermission, clearEditorInitialPermission, loadEditorInitialPermission,
    savePermission
} from "../../actions/permissionsActions";
import {bindActionCreators} from "redux";
import PermissionEditorForm from '../../components/permissions/permissionEditorForm';
import { State } from '../../store/initialState';
import { formValueSelector } from 'redux-form';

class PermissionEditorFormValues {
    id: string
    name: string;
    description: string;
}

class PermissionEditorFormContainer extends React.Component {
    props: any;

    async componentDidMount() {
        this.props.actions.clearEditorInitialPermission();
        this.props.actions.loadEditorInitialPermission(this.props.match.params.permissionId);
    }

    async onCancel() {
        this.props.actions.cancelSavePermission();
    }

    async onSubmit(values: PermissionEditorFormValues) {
        await this.props.actions.savePermission({id: values.id, name: values.name, description: values.description});
    };

    async onChange(value: any) {
    }

    render() {
        return (
            <div>
                <PermissionEditorForm initialValues={this.props.initialPermission}
                                      isNewDescription={this.props.isNewDescription}
                                      onCancel={this.onCancel.bind(this)}
                                      onSubmit={this.onSubmit.bind(this)}
                                      errorMessage={this.props.errorMessage}
                                      isError={this.props.isError}/>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    const selector = formValueSelector('permissionEditorForm');
    const initialPermission = state.permissionEditor.initialPermission;
    return {
        initialPermission: initialPermission != null ? {
            id: initialPermission.data.id,
            name: initialPermission.data.name,
            description: initialPermission.data.description
        } : null,
        isNewDescription: initialPermission != null ? false : true,
        errorMessage: state.permissionEditor.errorMessage,
        isError: state.permissionEditor.isError
    };
}

function mapActionToProps(dispatch: any) {
    return {
        actions: bindActionCreators({cancelSavePermission, clearEditorInitialPermission, loadEditorInitialPermission, savePermission}, dispatch)
    };
}

export default connect(mapStateToProps, mapActionToProps)(PermissionEditorFormContainer);