export function paragraphTableHasErrored(bool) {
    return {
        type: 'PARAGRAPHTABLE_HAS_ERROR',
        hasErrored: bool
    };
}

export function paragraphTableIsLoading(bool) {
    return {
        type: 'PARAGRAPHTABLE_IS_LOADING',
        isLoading: bool
    };
}

export function paragraphTablePopulateDataSuccess(paragraphs) {
    return {
        type: 'PARAGRAPHTABLE_POPULATE_DATA_SUCCESS',
        paragraphs
    };
}


export function paragraphTablePopulateData(url) {
    return (dispatch) => {
        dispatch(paragraphTableIsLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(paragraphTableIsLoading(false));
                dispatch(paragraphTablePopulateDataSuccess(data.body));
            })
            .catch( (error) => {
                dispatch(paragraphTableIsLoading(false));
                dispatch(paragraphTableHasErrored(true));
            })
    }
}
