import { Avatar, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { PostsFeed_data } from './__generated__/PostsFeed_data'
import { gql } from '@apollo/client'
import React from 'react'

export const POSTS_FEED_DATA_FRAGMENT = gql`
  fragment PostsFeed_data on connection_query_posts_list {
    count
    items {
      id
      text
      author {
        nickName
        id
        profileImg
      }
      reactions(pagination: { limit: 100, offset: 0 }) {
        count
      }
      comments(pagination: { limit: 100, offset: 0 }) {
        count
      }
    }
  }
`

type Props = {
  data?: PostsFeed_data | null
}

export const PostsFeed = (props: Props) => {
  return (
    <div>
      <div>total posts in dailyfaily.com: {props.data?.count}</div>
      {(props.data?.items ?? []).map(p => (
        <div key={p?.id} style={{ marginBottom: '50px' }}>
          <Paper style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={p?.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
              <Link to={`/profile/${p?.author?.id}`}>
                {p?.author?.nickName ?? '<unknown user>'}
              </Link>
            </div>

            <Typography variant='h5'>{p?.text}</Typography>

            <div>reactions count: {p?.reactions?.count}</div>
            <div>comments count: {p?.comments?.count}</div>
            <Link to={`/posts/${p?.id}`}>detail</Link>
          </Paper>
        </div>
      ))}
      <div>only last 10 posts are shown</div>
    </div>
  )
}
