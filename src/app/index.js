import '../scss/pure.scss'
// import '../assets/css/bootstrap.min.css'  // 引入样式文件
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import { Router, browserHistory } from 'react-router' // Browser history 是由 React Router 创建浏览器应用推荐的 history
import { syncHistoryWithStore } from 'react-router-redux' // 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import configureStore from './configureStore'
import routes from './routes'   // 引入路由配置


const store = configureStore();

// 创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(browserHistory, store)


//react-redux
render(
    <div>
        <Provider store={store}>
            <div>
	            <Router history={history} routes={routes} />
	        </div>
        </Provider>
    </div>,
    document.getElementById('app'))