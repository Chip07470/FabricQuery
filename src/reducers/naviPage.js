export function naviPage(state={}, action) {
    switch (action.type) {
        case 'NAVIPAGE_CHANGED': {
            return action.naviPage;
        }
        default:
            return state;
    }
}