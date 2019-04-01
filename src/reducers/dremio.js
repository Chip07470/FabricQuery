export function dremioHome(state=[], action) {
    switch (action.type) {
        case 'DREMIO_HOME_FETCH_SUCCESS': {
            return action.dremioHome;
        }
        default:
            return state;
    }
}

export function dremioCatalog(state=[], action) {
    switch (action.type) {
        case 'DREMIO_GET_CATALOG_FETCH_SUCCESS': {
            return action.dremioCatalog;
        }
        default:
            return state;
    }
}