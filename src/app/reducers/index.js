import {
  combineReducers
} from 'redux'
import items from './items'
import filter from './filter'
import update from './count' // 引入update这个reducer
// import selectedLang from './githubUsers'
// import gitUsers from './githubUsers'
// import postsByReddit from './posts'
// import selectedReddit from './posts'
import {
  routerReducer
} from 'react-router-redux' // 将routerReducer一起合并管理
import {
  SELECT_REDDIT,
  INVALIDATE_REDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  RECEIVE_USERS,
  REQUEST_USERS,
  SELECT_LANG
} from '../actions'

function selectedLang(state = 'Javascript', action) {

  switch (action.type) {
    case SELECT_LANG:
      return action.lang
    default:
      return state
  }
}

function gitUsers(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
    case REQUEST_USERS:
      return Object.assign({}, state, {
        [action.lang]: users(state[action.lang], action)
      })
    default:
      return state
  }
}
// es6可设置默认参数
function users(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function selectedReddit(state = 'reactjs', action) {
  // console.log(action.type)
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByReddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default:
      return state
  }
}



// const rootReducer = combineReducers({
//   postsByReddit,
//   selectedReddit
// })
//Ensure you have added the `routerReducer` to your store's reducers 
//via `combineReducers` or whatever method you use to isolate your reducers.
const rootReducer = combineReducers({
  items,
  filter,
  update,
  selectedLang,
  gitUsers,
  postsByReddit,
  selectedReddit,
  routing: routerReducer
})

export default rootReducer