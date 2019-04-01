export function queryHasErrored (state=false, action) {
    switch (action.type) {
        case 'QUERY_HAS_ERRORED': {
            return action.hasErrored;
        }
        default:
            return state;
    }
}

export function queryIsLoading (state=false, action) {
    switch (action.type) {
        case 'QUERY_IS_LOADING': {
            return action.isLoading;
        }
        default:
            return state;
    }
}

export function query(state=[], action) {
    switch (action.type) {
        case 'QUERY_FETCH_DATA_SUCCESS': {
            return action.notebooks;
        }
        default:
            return state;
    }
}
