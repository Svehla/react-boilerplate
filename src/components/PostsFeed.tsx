import { Avatar, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { PostsFeed_data } from './__generated__/PostsFeed_data'
import { gql } from '@apollo/client'
import React from 'react'

export const POSTS_FEED_DATA_FRAGMENT = gql`
  fragment PostsFeed_data on cursor_connection_query_posts {
    edges {
      node {
        id
        text
        author {
          id
          nickName
          bio
          profileImg
        }
        reactions(first: 10) {
          edges {
            node {
              id
            }
          }
        }
        comments(first: 10) {
          edges {
            node {
              id
            }
          }
        }
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
      {props.data?.edges?.map(p => (
        <div key={p?.node?.id} style={{ marginBottom: '50px' }}>
          <Paper style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={p?.node?.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to={`/profile/${p?.node?.author?.id}`}>
                  {p?.node?.author?.nickName ?? '<unknown user>'}
                </Link>
                <div>{p?.node?.author?.bio}</div>
              </div>
            </div>

            <Typography variant='h5'>{p?.node?.text}</Typography>

            {/* <div>reactions count: {p?.reactions?.count}</div>
            <div>comments count: {p?.comments?.count}</div> */}
            <Link to={`/posts/${p?.node?.id}`}>detail</Link>
          </Paper>
        </div>
      ))}
      <div>only last 10 posts are shown</div>
    </div>
  )
}
