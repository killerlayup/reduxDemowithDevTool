import { combineReducers } from 'redux'
import items from './items'
import filter from './filter'
import update from './count' // 引入update这个reducer
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理

//Ensure you have added the `routerReducer` to your store's reducers 
//via `combineReducers` or whatever method you use to isolate your reducers.
const rootReducer = combineReducers({
    items,
    filter,
    update,
    routing: routerReducer
})

export default rootReducer
