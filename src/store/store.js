import { createStore } from 'redux';
import simonReducer from '../reducers/reducer'

export default () => {
    const store = createStore(
        simonReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    
    return store;
}