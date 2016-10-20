import React, { PropTypes, Component } from 'react'

export default class githubUserList extends Component {
  render() {
    return (
      <ol>
      {this.props.users.map((user,index) =>
        <li key={index}><a href={user.html_url}>{user.name}</a> ({user.stargazers_count} stars) <br/> {user.description}</li>
      )}
      </ol>
    )
  }
}

githubUserList.propTypes = {
  users: PropTypes.array.isRequired
}
