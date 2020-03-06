import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faTimes, faBars} from '@fortawesome/free-solid-svg-icons'

import * as serviceWorker from './serviceWorker';

library.add(faUser, faTimes, faBars);

const jsx = (
  <App/>
)

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
