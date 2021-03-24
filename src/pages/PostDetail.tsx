import { AddCommentMutation, AddCommentMutationVariables } from './__generated__/AddCommentMutation'
import { Avatar, Button, CircularProgress, Paper, TextField, Typography } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import { PostDetailQuery, PostDetailQueryVariables } from './__generated__/PostDetailQuery'
import { UserDetailContext } from '../globalState/UserDetailContext'
import { appConfig } from '../appConfig'
import { gql, useMutation, useQuery } from '@apollo/client'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import React, { useContext, useState } from 'react'

export const POSTS_QUERY = gql`
  query PostDetailQuery($id: Int!) {
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

export const ADD_COMMENT_MUTATION = gql`
  mutation AddCommentMutation($input: addCommentMutation_args_input_arg!) {
    addCommentMutation(input: $input) {
      comment {
        id
        text
      }
    }
  }
`

export const PostDetail = () => {
  const [commentText, setCommentText] = useState('')
  const params = useParams<{ postId: string }>()
  const userDetail = useContext(UserDetailContext)
  const [addComment] = useMutation<AddCommentMutation, AddCommentMutationVariables>(
    ADD_COMMENT_MUTATION
  )

  const { data, loading, error, refetch } = useQuery<PostDetailQuery, PostDetailQueryVariables>(
    POSTS_QUERY,
    {
      variables: {
        id: parseFloat(params.postId),
      },
    }
  )

  const post = data?.post

  return (
    <div style={{ marginTop: '2rem' }}>
      <Link
        to={`/`}
        style={{
          display: 'flex',
          textDecoration: 'none',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <ArrowBackIosIcon />
        Go back
      </Link>

      <Paper style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={post?.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
          <Link to={`/profile/${post?.author?.id}`}>
            <div>{post?.author?.email ?? '<unknown user>'}</div>
          </Link>
        </div>

        <Typography variant='h5'>{post?.text}</Typography>

        <div>reactions count: {post?.reactions?.count}</div>
        <div>comments count: {post?.comments?.count}</div>
      </Paper>

      {userDetail.data?.isPublicUserLoggedIn ? (
        <form
          onSubmit={async e => {
            e.preventDefault()

            await addComment({
              variables: {
                input: {
                  text: commentText,
                  postId: parseFloat(params.postId),
                },
              },
            })

            setCommentText('')

            refetch()
          }}
        >
          <TextField
            label='Přidat komentář'
            onChange={e => {
              setCommentText(e.target.value)
            }}
            value={commentText}
            type='text'
            disabled={loading}
          />

          <Button type='submit'>
            {loading && <CircularProgress color='inherit' />}
            odeslat
          </Button>
        </form>
      ) : (
        <h1>
          Chceš přidat komentář i ty? <a href={appConfig.google.authLoginURL}>TAK SE PŘIHLAŠ!</a>
        </h1>
      )}

      {(post?.comments?.items ?? []).map(c => (
        <div key={c?.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={c?.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
            <div>{c?.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}