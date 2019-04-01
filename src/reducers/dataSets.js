export function dataSetsHasErrored (state=false, action) {
    switch (action.type) {
        case 'DATASETS_HAS_ERRORED': {
            return action.hasErrored;
        }
        default:
            return state;
    }
}

export function dataSetsIsLoading (state=false, action) {
    switch (action.type) {
        case 'DATASETS_IS_LOADING': {
            return action.isLoading;
        }
        default:
            return state;
    }
}

export function dataSets(state=[], action) {
    switch (action.type) {
        case 'DATASETS_FETCH_DATA_SUCCESS': {
            return action.dataSets;
        }
        default:
            return state;
    }
}

export function dataDomain(state={}, action) {
    switch (action.type) {
        case 'DATADOMAIN_SELECTED': {
            return action.dataDomain;
        }
        default:
            return state;
    }   
}
