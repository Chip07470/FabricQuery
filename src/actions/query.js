export function queryHasErrored(bool) {
    return {
        type: 'QUERY_HAS_ERROR',
        hasErrored: bool
    }
}

export function queryIsLoading(bool) {
    return {
        type: 'QUERY_IS_LOADING',
        hasErrored: bool
    }
}

export function queryFetchDataSuccess(query) {
    return {
        type: 'QUERY_FETCH_DATA_SUCCESS',
        query
    }
}