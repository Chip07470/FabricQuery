
export function workflow(state=[], action) {
    switch (action.type) {
        case 'WORKFLOW_FETCH_DATA_SUCCESS': {
            return {...state, workflow: action.workflow};
        }
        default:
            return state;
    }
}
