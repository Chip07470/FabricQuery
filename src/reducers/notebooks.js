export function notebooksHasErrored (state=false, action) {
    switch (action.type) {
        case 'NOTEBOOKS_HAS_ERRORED': {
            return action.hasErrored;
        }
        default:
            return state;
    }
}

export function notebooksIsLoading (state=false, action) {
    switch (action.type) {
        case 'NOTEBOOKS_IS_LOADING': {
            return action.isLoading;
        }
        default:
            return state;
    }
}

export function notebooks(state=[], action) {
    switch (action.type) {
        case 'NOTEBOOKS_FETCH_DATA_SUCCESS': {
            return action.notebooks;
        }
        default:
            return state;
    }
}

export function notebook(state={}, action) {
    switch (action.type) {
        case 'NOTEBOOK_FETCH_DATA_SUCCESS': {
            return action.notebook;
        }
        default:
            return state;
    }   
}

export function notebooksShow(state=[], action) {
    switch (action.type) {
        case 'NOTEBOOKS_SHOW': {
            return action.notebooksShow;
        }
        default:
            return state;
    }   
}

export function noteInfo(state=[], action) {
    switch (action.type) {
        case 'NOTEINFO_FETCH_DATA_SUCCESS': {
            return action.noteInfo;
        }
        default:
            return state;
    }   
}


