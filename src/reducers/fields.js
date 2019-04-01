export function fieldsHasErrored (state=false, action) {
    switch (action.type) {
        case 'FIELDS_HAS_ERRORED': {
            return action.hasErrored;
        }
        default:
            return state;
    }
}

export function fieldsIsLoading (state=false, action) {
    switch (action.type) {
        case 'FIELDS_IS_LOADING': {
            return action.isLoading;
        }
        default:
            return state;
    }
}

export function fields(state=[], action) {
    switch (action.type) {
        case 'FIELDS_FETCH_DATA_SUCCESS': {
            return action.fields;
        }
        default:
            return state;
    }
}