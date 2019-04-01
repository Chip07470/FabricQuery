import {combineReducers} from 'redux';

import { notebook, notebooks, notebooksHasErrored, notebooksIsLoading, notebooksShow, noteInfo } from './notebooks';
import { paragraphResult, paragraphResultHasErrored, paragraphResultIsLoading } from './paragraphResult';
import { paragraphs, paragraphsObj, paragraphsHasErrored, paragraphsIsLoading } from './paragraphs';
import { paragraphTable, paragraphTableHasErrored, paragraphTableIsLoading } from './paragraphTable';

import { dataDomains, dataDomainsHasErrored, dataDomainsIsLoading } from './dataDomains';
import { dataSets, dataSetsHasErrored, dataSetsIsLoading, dataDomain } from './dataSets';
import { fields, fieldsHasErrored, fieldsIsLoading } from './fields';
import { dremioHome, dremioCatalog } from './dremio';

import { kafka } from './datasource';
import { topics } from './kafka';
import { naviPage } from './naviPage';
import { workflow } from './workflow';
import { user } from './userReducer';

const appReducer = combineReducers({
    notebook, notebooks, notebooksHasErrored, notebooksIsLoading, notebooksShow, noteInfo,
    paragraphResult, paragraphResultHasErrored, paragraphResultIsLoading,
    paragraphs, paragraphsObj, paragraphsHasErrored, paragraphsIsLoading,
    paragraphTable, paragraphTableHasErrored, paragraphTableIsLoading,
    dataDomains, dataDomainsHasErrored, dataDomainsIsLoading,
    dataSets, dataSetsHasErrored, dataSetsIsLoading, dataDomain,
    fields, fieldsHasErrored, fieldsIsLoading,
    dremioHome, dremioCatalog,
    kafka, topics,
    user,
    workflow,
    naviPage,
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT' || action.type === 'WORKFLOWS_INIT'){
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;