export function paragraphsHasErrored (state=false, action) {
    switch (action.type) {
        case 'PARAGRAPHS_HAS_ERRORED': {
            return action.hasErrored;
        }
        default:
            return state;
    }
}

export function paragraphsIsLoading (state=false, action) {
    switch (action.type) {
        case 'PARAGRAPHS_IS_LOADING': {
            return action.isLoading;
        }
        default:
            return state;
    }
}

export function paragraphs(state=[], action) {
    switch (action.type) {
        case 'PARAGRAPHS_FETCH_DATA_SUCCESS': {
            return action.paragraphs;
        }
        default:
            return state;
    }
}

export function paragraphsObj(state={}, action) {
    switch (action.type) {
        case 'PARAGRAPHSOBJ_FETCH_DATA_SUCCESS': {
            return action.paragraphsObj;
        }
        default:
            return state;
    }
}