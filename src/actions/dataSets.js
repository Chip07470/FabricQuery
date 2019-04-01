import { store } from '../index';
import {fieldsIsLoading, fieldsFetchDataSuccess } from '../actions/fields';

const fqurl = "http://localhost:8889"
const tenantId = "00000";

export function dataSetsHasErrored(bool) {
    return {
        type: 'DATASETS_HAS_ERROR',
        hasErrored: bool
    }
}

export function dataSetsIsLoading(bool) {
    return {
        type: 'DATASETS_IS_LOADING',
        hasErrored: bool
    }
}

export function dataSetsFetchDataSuccess(datasets) {
    return {
        type: 'DATASETS_FETCH_DATA_SUCCESS',
        datasets
    }
}

export function dataDomainSelected(dataDomain) {
    return {
        type: 'DATADOMAIN_SELECTED',
        dataDomain
    }
}

export function dataSetsFetchData(url) {
    return (dispatch) => {
        dispatch(dataSetsIsLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(dataSetsIsLoading(false));
                dispatch(dataSetsFetchDataSuccess(data.body));
            })
            .catch( (error) => {
                dispatch(dataSetsIsLoading(false));
                dispatch(dataSetsHasErrored(true));
            })
    }
}

export function dataSetDetail(dataSet, dataDomain) {
    return (dispatch) => {
        dispatch(fieldsIsLoading(true));
        fetch(fqurl + "/api/fqmeta/getFieldSpec/" + tenantId + "?sorCode=" + dataDomain.sysCode + "$entityCode=" + dataSet.entityCode)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(fieldsIsLoading(false));
                dispatch(fieldsFetchDataSuccess(data));
            })
            .catch( (error) => {
                dispatch(fieldsIsLoading(false));
            })
    }
}

export function loadDataSets(dataDomain) {
    return (dispatch) => {
        dispatch(dataDomainSelected(dataDomain));
        fetch(fqurl + "/api/fqmeta/getAllInboundEntitiesBySorName/" + tenantId + "?sorName=" + dataDomain.sorName)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(dataSetsIsLoading(false));
                dispatch(dataSetsFetchDataSuccess(data));
            })
            .catch( (error) => {
                dispatch(dataSetsIsLoading(false));
                dispatch(dataSetsHasErrored(true));
            })
    }
}

export function fqDataSetClick(e) {
    e.preventDefault();
    store.dispatch(loadDataSets(fqurl + "/api/fqmeta/allCurrentSors/" + tenantId));
}