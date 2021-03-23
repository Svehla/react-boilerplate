import { Avatar, Card, Paper, Typography } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import { PostsQuery } from './__generated__/PostsQuery'
import { gql, useQuery } from '@apollo/client'
import React from 'react'

export const POSTS_QUERY = gql`
  query PostsQuery {
    posts(pagination: { limit: 3, offset: 0 }) {
      count
      items {
        id
        text
        author {
          email
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
  }
`

export const Posts = () => {
  const { data, loading, error } = useQuery<PostsQuery>(POSTS_QUERY)

  return (
    <div style={{ marginTop: '2rem' }}>
      {(data?.posts?.items ?? []).map(p => (
        <div key={p.id} style={{ marginBottom: '50px' }}>
          <Paper style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={p.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
              <div>{p.author?.email ?? '<unknown user>'}</div>
            </div>

            <Typography variant='h5'>{p.text}</Typography>

            <div>reactions count: {p.reactions?.count}</div>
            <div>comments count: {p.comments?.count}</div>
            <Link to={`/posts/${p.id}`}>detail</Link>
          </Paper>
        </div>
      ))}
    </div>
  )
}
