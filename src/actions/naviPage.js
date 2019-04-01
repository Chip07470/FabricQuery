import {store} from '../index';

export function naviPageChanged(naviPage) {
    return {
        type: 'NAVIPAGE_CHANGED',
        naviPage
    }
}

export function getNaviPage() {
    return store.getState().naviPage;
}

export function updateNaviPage(naviPage) {
    store.dispatch(naviPageChanged(naviPage));
}