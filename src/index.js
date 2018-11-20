import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'daemonite-material/css/material.min.css';
import Root from './components/Root/index';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers/index';
import './i18n';
// import "../node_modules/daemonite-material/css/material.min.css";

const store = createStore(reducer)

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
