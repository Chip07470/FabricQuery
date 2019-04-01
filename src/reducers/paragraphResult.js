export function paragraphResultHasErrored (state=false, action) {
    switch (action.type) {
        case 'PARAGRAPHRESULT_HAS_ERRORED': {
            return action.hasErrored;
        }
        default:
            return state;
    }
}

export function paragraphResultIsLoading (state=false, action) {
    switch (action.type) {
        case 'PARAGRAPHRESULT_IS_LOADING': {
            return action.isLoading;
        }
        default:
            return state;
    }
}

export function paragraphResult(state=[], action) {
    switch (action.type) {
        case 'PARAGRAPHRESULT_POPULATE_DATA_SUCCESS': {
            return action.paragraphResult;
        }
        default:
            return state;
    }
}