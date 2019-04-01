export function paragraphTableHasErrored (state=false, action) {
    switch (action.type) {
        case 'PARAGRAPHTABLE_HAS_ERRORED': {
            return action.hasErrored;
        }
        default:
            return state;
    }
}

export function paragraphTableIsLoading (state=false, action) {
    switch (action.type) {
        case 'PARAGRAPHTABLE_IS_LOADING': {
            return action.isLoading;
        }
        default:
            return state;
    }
}

export function paragraphTable(state=[], action) {
    switch (action.type) {
        case 'PARAGRAPHTABLE_POPULATE_DATA_SUCCESS': {
            return action.paragraphTable;
        }
        default:
            return state;
    }
}
