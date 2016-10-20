import fetch from 'isomorphic-fetch'
import {
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_ALL,
  FILTER_ITEM
} from '../constants/actionTypes'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const REQUEST_USERS = 'REQUEST_USERS'
export const SELECT_LANG = 'SELECT_LANG'

//中间件使action创建函数可以返回一个function代替一个action对象
export function addItem() {
  return dispatch => {
    setTimeout(() => dispatch({
      type: ADD_ITEM
    }), 1000)
  }
}
//下面都是返回一个action对象
export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    item
  }
}
export function deleteAll() {
  return {
    type: DELETE_ALL
  }
}
export function filterItem(e) {
  let filterItem = e.target.value

  return {
    type: FILTER_ITEM,
    filterItem
  }
}

//新闻post
//选择新闻类型action
export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}
//废弃新闻类型action
export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}
//开始获取新闻action
function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}
//获取新闻成功的action
function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit: reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

//获取文章，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
function fetchPosts(reddit) {
  console.log(reddit)
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

//是否需要获取文章
function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

//如果需要则开始获取文章
export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}

//开始获取User action
export function requestUser(lang) {
  return {
    type: REQUEST_USERS,
    lang
  }
}

//获取userLists 先触发requestUser开始获取action，完成后触发receiveUser获取成功的action
export function fetchGithubUsers(lang) {
  // console.log(lang+1)
  return dispatch => {

    dispatch(requestUser(lang))
    return fetch(`https://api.github.com/search/repositories?q=${lang}&sort=stars`)
      .then(response => response.json())
      .then(json => dispatch(receiveUser(lang, json)))
  }
}
//获取GithubUser成功的action
export function receiveUser(lang, json) {
  return {
    type: RECEIVE_USERS,
    lang: lang,
    posts: json.items,
    receivedAt: Date.now()
  }
}

export function selectLang(lang) {
  return {
    type: SELECT_LANG,
    lang
  }
}