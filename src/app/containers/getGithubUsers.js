import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchGithubUsers, receiveUser, selectLang } from '../actions'

import Picker from '../components/Picker'
// import githubUserList from '../components/githubUserList'
import Posts from '../components/Posts'

class getGithubUsers extends Component {
	constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    // this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  //初始化渲染后触发
  componentDidMount() {
    console.log('执行componentDidMount');
    const { dispatch, selectedLang } = this.props
    console.log(selectedLang)
    dispatch(fetchGithubUsers(selectedLang))
  }
  //每次接受新的props触发
  componentWillReceiveProps(nextProps) {
    console.log('执行componentWillReceiveProps',nextProps);
    if (nextProps.selectedLang !== this.props.selectedLang) {
      const { dispatch, selectedLang } = nextProps
      dispatch(fetchGithubUsers(selectedLang))
    }

  }
  handleChange(nextLang) {
    this.props.dispatch(selectLang(nextLang))
  }
  render() {
  	const { users, isFetching, selectedLang } = this.props;
  	// console.log(selectedLang)
  	// selectedLang='Javascript'
  	return (
  		<div>
  		<Picker value={selectedLang} onChange={this.handleChange}
                options={[ 'Javascript', 'python' ]}/>
  		{isFetching && users.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && users.length === 0 &&
          <h2>Empty.</h2>
        }
        {users.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={users} />
          </div>
        }
  		</div>
  	)
  }
}




function mapStateToProps(state) {
  const { selectedLang,gitUsers } = state
  const {
    isFetching,
    items: users
  } = gitUsers[selectedLang] || {
    isFetching: true,
    items: []
  }

  return {
    selectedLang,
    users,
    isFetching,
  }
}

export default connect(mapStateToProps)(getGithubUsers)