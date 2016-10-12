import React from 'react' // 引入react
import { Route, IndexRoute } from 'react-router' // 引入react路由
// import { App, AddItems, Foo } from './containers' // 
import App from './containers/App'
import AddItems from './containers/AddItems'
import Foo from './containers/Foo'

//<IndexRoute 和<Route 有什么区别
export default (
    <Route path="/" component={App}>
        <IndexRoute component={AddItems}/>
        <Route path="index" component={AddItems}/>
        <Route path="foo" component={Foo}/>
    </Route>
)