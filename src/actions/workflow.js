import { store } from '../index';

export function workflowFetchDataSuccess(workflow) {
    return {
        type: 'WORKFLOW_FETCH_DATA_SUCCESS',
        workflow
    }
}

export function getWorkflow() {
    return store.getState().workflow;
}

export function updateWorkflow(workflow) {
    store.dispatch(workflowFetchDataSuccess(workflow));
}