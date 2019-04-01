export function dataDomainsHasErrored (state=false, action) {
    switch (action.type) {
        case 'DATADOMAINS_HAS_ERRORED': {
            return action.hasErrored;
        }
        default:
            return state;
    }
}

export function dataDomainsIsLoading (state=false, action) {
    switch (action.type) {
        case 'DATADOMAINS_IS_LOADING': {
            return action.isLoading;
        }
        default:
            return state;
    }
}

export function dataDomains(state=[], action) {
    switch (action.type) {
        case 'DATADOMAINS_FETCH_DATA_SUCCESS': {
            return action.dataDomains;
        }
        default:
            return state;
    }
}