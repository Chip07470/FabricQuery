export function paragraphResultHasErrored(bool) {
    return {
        type: 'PARAGRAPHRESULT_HAS_ERROR',
        hasErrored: bool
    };
}

export function paragraphResultIsLoading(bool) {
    return {
        type: 'PARAGRAPHRESULT_IS_LOADING',
        isLoading: bool
    };
}

export function paragraphResultPopulateDataSuccess(paragraphs) {
    return {
        type: 'PARAGRAPHRESULT_POPULATE_DATA_SUCCESS',
        paragraphs
    };
}


export function paragraphResultPopulateData(url) {
    return (dispatch) => {
        dispatch(paragraphResultIsLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(paragraphResultIsLoading(false));
                dispatch(paragraphResultFetchDataSuccess(data.body));
            })
            .catch( (error) => {
                dispatch(paragraphResultIsLoading(false));
                dispatch(paragraphResultHasErrored(true));
            })
    }
}
