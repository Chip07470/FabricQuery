import {store} from '../index';
import { DURL } from '../constants/fqRestApiConstants';

export function dremioHomeSuccess(dremioHome) {
    return {
        type: 'DREMIO_HOME_FETCH_SUCCESS',
        dremioHome
    };
}
export function dremioGetCatalogSuccess(dremioCatalog) {
    return {
        type: 'DREMIO_GET_CATALOG_FETCH_SUCCESS',
        dremioCatalog
    };
}

export function getDremioHome(id) {
    fetch(DURL + "home/@" + id)
    .then((response) => response.json())
    .then( (data) => {
        store.dispatch(dremioHomeSuccess(data));
     })
    .catch( (error) => {
        console.log("Erroe: " + error);
    })    
}

export function getDremioCatalog(id) {
    fetch(DURL + "catalog" + id)
    .then((response) => response.json())
    .then( (data) => {
        store.dispatch(dremioGetCatalogSuccess(data));
     })
    .catch( (error) => {
        console.log("Erroe: " + error);
    })    
}