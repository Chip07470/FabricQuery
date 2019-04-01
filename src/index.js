import React from 'react';
import { render } from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore';
import Root from './components/Root';

export const store = configureStore();
store.subscribe(()=>{
    console.log("store changed:", store.getState());
});

// ReactDOM.render(<App />, document.getElementById('root'));

render (
    <Root store={store} />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
