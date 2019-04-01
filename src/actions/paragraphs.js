import { zurl } from '../components/notebook/NotebookList';

export function paragraphsHasErrored(bool) {
    return {
        type: 'PARAGRAPHS_HAS_ERROR',
        hasErrored: bool
    };
}

export function paragraphsIsLoading(bool) {
    return {
        type: 'PARAGRAPHS_IS_LOADING',
        isLoading: bool
    };
}

export function paragraphsFetchDataSuccess(paragraphs) {
    return {
        type: 'PARAGRAPHS_FETCH_DATA_SUCCESS',
        paragraphs
    };
}

export function paragraphsObjFetchDataSuccess(paragraphsObj) {
    return {
        type: 'PARAGRAPHSOBJ_FETCH_DATA_SUCCESS',
        paragraphsObj
    };
}

export function paragraphsFetchData(url) {
    return (dispatch) => {
        dispatch(paragraphsIsLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(paragraphsIsLoading(false));
                dispatch(paragraphsFetchDataSuccess(data.body));
            })
            .catch( (error) => {
                dispatch(paragraphsIsLoading(false));
                dispatch(paragraphsHasErrored(true));
            })
    }
}

export function paragraphDetail(e) {
    e.preventDefault();
    fetch(zurl + "notebook/" + e.target.id)
        .then((response) => response.json())
        .then( (data) => {

        })
        .catch( (error) => {

        })
}

export function loadParagraphs(url) {
    return (dispatch) => {
        dispatch(paragraphsIsLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(paragraphsIsLoading(false));
                dispatch(paragraphsObjFetchDataSuccess(data.body));
            })
            .catch( (error) => {
                dispatch(paragraphsIsLoading(false));
                dispatch(paragraphsHasErrored(true));
            })
    }
}