export function topics(state={}, action) {
    switch (action.type) {
        case 'KAFKA_FETCH_TOPICS_SUCCESS': {
            return action.topics;
        }
        default:
            return state;
    }
}