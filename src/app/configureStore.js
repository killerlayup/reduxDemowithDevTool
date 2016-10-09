import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import invariant from 'redux-immutable-state-invariant';
import * as actionCreators from './actions'; 

export let isMonitorAction;
export default function configureStore(initialState) {
    // const store = buildStore(rootReducer, initialState)
    // 
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(invariant(), thunk),
        window.devToolsExtension ? window.devToolsExtension({
          getMonitor: (monitor) => { isMonitorAction = monitor.isMonitorAction; },
          actionCreators
        }) : f => f
      ));

    if(module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers'))
        })
    }

    return store
}