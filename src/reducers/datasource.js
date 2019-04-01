export function kafka(state=[], action) {
    switch (action.type) {
        case 'KAFKA_DATA_SOURCE_FETCH_DATA_SUCCESS': {
            return action.kafka;
        }
        default:
            return state;
    }
}