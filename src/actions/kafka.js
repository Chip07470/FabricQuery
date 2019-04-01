import {store} from '../index';
import { KURL } from '../constants/fqRestApiConstants'

export function kafkaFetchTopicsSuccess(topics) {
    return {
        type: 'KAFKA_FETCH_TOPICS_SUCCESS',
        topics
    };
}

export function getKafkaTopics(url) {
    fetch(KURL + "topics?kurl=" + encodeURIComponent(url))
    .then((response) => response.json())
    .then( (data) => {
        store.dispatch(kafkaFetchTopicsSuccess(data));
     })
    .catch( (error) => {
        console.log("Erroe: " + error);
    })    
}