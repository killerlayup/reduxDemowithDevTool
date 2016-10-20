import {
    compose,
    createStore,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import invariant from 'redux-immutable-state-invariant';
import * as actionCreators from './actions';
import {
    logger1,
    logger2
} from './middleware/logger';
//applyMiddleware来自redux可以包装 store 的 dispatch()
export let isMonitorAction;
export default function configureStore(initialState) {
    // const store = buildStore(rootReducer, initialState)
    // thunk作用使action创建函数可以返回一个function代替一个action对象
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(invariant(), thunk, logger1, logger2),
        window.devToolsExtension ? window.devToolsExtension({
            getMonitor: (monitor) => {
                isMonitorAction = monitor.isMonitorAction;
            },
            actionCreators
        }) : f => f
    ));
    //如果在热替换状态（Webpack hot module replacement）下，允许替换reducer
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers'))
        })
    }

    return store
}