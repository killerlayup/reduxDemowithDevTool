import React, { Component } from 'react' // 引入React
import { Link } from 'react-router' // 引入Link处理导航跳转
export default class App extends Component {
    render() {
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <span className="navbar-brand" href="#">
                                <Link to="/">Redux</Link>
                            </span>
                        </div>
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/index" activeStyle={{color: '#555', backgroundColor: '#e7e7e7'}}>删除添加Item</Link>
                            </li>
                            <li>
                                <Link to="/foo" activeStyle={{color: '#555', backgroundColor: '#e7e7e7'}}>静态数据</Link>
                            </li>
                            <li>
                                <Link to="/fetchPost" activeStyle={{color: '#555', backgroundColor: '#e7e7e7'}}>异步获取</Link>
                            </li>
                            <li>
                                <Link to="/fetchGithubUsers" activeStyle={{color: '#555', backgroundColor: '#e7e7e7'}}>fetchGithubUsers</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="panel panel-default">
                    <div className="panel-body">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}