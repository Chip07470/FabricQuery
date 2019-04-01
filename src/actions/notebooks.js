import { zurl } from '../components/notebook/NotebookList';
import {loadParagraphs} from './paragraphs';
import {store} from '../index';

export function notebooksHasErrored(bool) {
    return {
        type: 'NOTEBOOKS_HAS_ERROR',
        hasErrored: bool
    };
}

export function notebooksIsLoading(bool) {
    return {
        type: 'NOTEBOOKS_IS_LOADING',
        isLoading: bool
    };
}

export function notebooksFetchDataSuccess(notebooks) {
    return {
        type: 'NOTEBOOKS_FETCH_DATA_SUCCESS',
        notebooks
    };
}

export function notebookFetchDataSuccess(notebook) {
    return {
        type: 'NOTEBOOK_FETCH_DATA_SUCCESS',
        notebook
    };
}

export function notebooksShow(bool) {
    return {
        type: 'NOTEBOOKS_SHOW',
        notebooksShow: bool
    };
}

export function initWorkflows() {
    return {
        type: 'WORKFLOWS_INIT'
    }
}

export function notebooksFetchData(url) {
    return (dispatch) => {
        dispatch(notebooksIsLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(notebooksIsLoading(false));
                dispatch(notebooksFetchDataSuccess(data.body));
            })
            .catch( (error) => {
                dispatch(notebooksIsLoading(false));
                dispatch(notebooksHasErrored(true));
            })
    }
}

export function createANewNote(data) {
        fetch(zurl + "notebook", {
            method: 'post',
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then( (data) => {
            console.log("data: " + data.body);
        })
        .catch( (error) => {
            console.log("error: " + error);
        })
}

// export function createANewNoteSync(data) {
//     const request = async() => {
//         const response = await fetch (zurl + "/notebook", {
//             method: 'post',
//             body: JSON.stringify(data)
//         });
//         const json = await response.json();
//     }
//     request();
// }

export function notebookDetail(e) {
    e.preventDefault();
    store.dispatch(loadParagraphs(zurl + "notebook/" + e.target.id));
}

export function notebookDetail2(o) {
    store.dispatch(loadParagraphs(zurl + "notebook/" + o.item.id));
    store.dispatch(notebookFetchDataSuccess(o.item));
    //hide notebooks; show paragraphs of the selected notebook
    store.dispatch(notebooksShow(false));
}

export function notebookDetail3(e) {
    e.preventDefault();
    store.dispatch(loadParagraphs(zurl + "notebook/" + e.currentTarget.id));
    const item = {"id": e.currentTarget.id, "label": e.currentTarget.textContent};
    store.dispatch(notebookFetchDataSuccess(item));
    //hide notebooks; show paragraphs of the selected notebook
    store.dispatch(notebooksShow(false));
}
