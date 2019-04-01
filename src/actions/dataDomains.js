import { store } from '../index';
import { dataSetsIsLoading, dataSetsFetchDataSuccess } from './dataSets';
import toastr from 'toastr';

const fqurl = "http://localhost:8889";
const tenantId = "00000";

export function dataDomainsHasErrored(bool) {
    return {
        type: 'DATADOMAINS_HAS_ERROR',
        hasErrored: bool
    }
}

export function dataDomainsIsLoading(bool) {
    return {
        type: 'DATADOMAINS_IS_LOADING',
        hasErrored: bool
    }
}

export function dataDomainsFetchDataSuccess(dataDomains) {
    return {
        type: 'DATADOMAINS_FETCH_DATA_SUCCESS',
        dataDomains
    }
}

export function dataDomainsFetchData(url) {
    return (dispatch) => {
        dispatch(dataDomainsIsLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(dataDomainsIsLoading(false));
                dispatch(dataDomainsFetchDataSuccess(data.body));
            })
            .catch( (error) => {
                dispatch(dataDomainsIsLoading(false));
                dispatch(dataDomainsHasErrored(true));
            })
    }
}

export function dataDomainDetail(dataDomain) {
    return (dispatch) => {
        dispatch(dataSetsIsLoading(true));
        fetch(fqurl + "/api/fqmeta/getAllInboundEntitiesBySorName/" + tenantId + "?sorName=" + dataDomain.sorName)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(dataSetsIsLoading(false));
                dispatch(dataSetsFetchDataSuccess(data));
            })
            .catch( (error) => {
                dispatch(dataSetsIsLoading(false));
            })
    }
}

export function loadDataDomains(url) {
    return (dispatch) => {
        dispatch(dataDomainsIsLoading(true));
        fetch(url)
            .then((response) => response.json())
            .then( (data) => {
                dispatch(dataDomainsIsLoading(false));
                dispatch(dataDomainsFetchDataSuccess(data.dataFlows));
            })
            .catch( (error) => {
                dispatch(dataDomainsIsLoading(false));
                dispatch(dataDomainsHasErrored(true));
            })
    }
}


export function initLoadDataDomain()
{

}

export function hdfsClick(e) 
{
    e.preventDefault();
    store.dispatch(loadDataDomains(fqurl + "/api/fqmeta/getAllDataFlows/" + tenantId));
}