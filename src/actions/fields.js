export function fieldsHasErrored(bool) {
    return {
        type: 'FIELDS_HAS_ERROR',
        hasErrored: bool
    }
}

export function fieldsIsLoading(bool) {
    return {
        type: 'FIELDS_IS_LOADING',
        hasErrored: bool
    }
}

export function fieldsFetchDataSuccess(fields) {
    return {
        type: 'FIELDS_FETCH_DATA_SUCCESS',
        fields
    }
}