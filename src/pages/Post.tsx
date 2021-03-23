import { Avatar, Paper, Typography } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import { PostQuery, PostQueryVariables } from './__generated__/PostQuery'
import { gql, useQuery } from '@apollo/client'
import React from 'react'

export const POSTS_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      text
      author {
        email
        id
        profileImg
      }
      reactions(pagination: { limit: 100, offset: 0 }) {
        count
        items {
          id
          reactionType
        }
      }
      comments(pagination: { limit: 100, offset: 0 }) {
        count
        items {
          id
          text
          author {
            id
            profileImg
            email
          }
        }
      }
    }
  }
`

export const Post = () => {
  const params = useParams<{ postId: string }>()

  const { data, loading, error } = useQuery<PostQuery, PostQueryVariables>(POSTS_QUERY, {
    variables: {
      id: params.postId,
    },
  })

  const post = data?.post
  return (
    <div style={{ marginTop: '2rem' }}>
      <Link to={`/`}>Go to post</Link>

      <Paper style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={post?.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
          <div>{post?.author?.email ?? '<unknown user>'}</div>
        </div>

        <Typography variant='h5'>{post?.text}</Typography>

        <div>reactions count: {post?.reactions?.count}</div>
        <div>comments count: {post?.comments?.count}</div>
      </Paper>

      {(post?.comments?.items ?? []).map(c => (
        <div key={c?.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={c?.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
            <div>{c?.text}</div>
          </div>
        </div>
      ))}
      <input type='text' />
    </div>
  )
}
