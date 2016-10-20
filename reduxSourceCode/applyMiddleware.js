import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 返回一个enhancer
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer)
    var dispatch = store.dispatch
    var chain = []
      // 暴漏 getState 和 dispatch 给 第三方中间件使用
    var middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      }
      //返回一个应用了middlewareAPI后的中中间件的函数组合  这个middlewareAPI 就是暴露了store(getState 和 dispatch) 给 第三方中间件使用
    chain = middlewares.map(middleware => middleware(middlewareAPI))
      //将这些中间件的函数组合在一起，然后传入store.dispatch，成为一个新的dispatch
    dispatch = compose(...chain)(store.dispatch)
      //返回的store里面的dispatch 增强了，然后暴露给用户
    return {
      ...store,
      dispatch
    }
  }
}
