import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <ol>
        {this.props.posts.map((post, i) =>
          <li key={i}><a href={post.html_url}>{post.name}</a>({post.stargazers_count} stars) <br/> {post.description}{post.title}</li>
        )}
      </ol>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
