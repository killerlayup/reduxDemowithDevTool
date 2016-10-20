import {
	RECEIVE_USERS,
	REQUEST_USERS,
	SELECT_LANG
} from '../actions'

export default function selectedLang(state = 'Javascript', action) {
	
  switch (action.type) {
    case SELECT_LANG:
      return action.lang
    default:
      return state
  }
}
export default function gitUsers(state = { }, action) {
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