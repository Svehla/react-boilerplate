import { AddCommentMutation, AddCommentMutationVariables } from './__generated__/AddCommentMutation'
import { Avatar, Button, CircularProgress, Paper, TextField, Typography } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import { PostDetailQuery, PostDetailQueryVariables } from './__generated__/PostDetailQuery'
import { UserDetailContext } from '../globalState/UserDetailContext'
import { appConfig } from '../appConfig'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useContext, useState } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

export const POSTS_QUERY = gql`
  query PostDetailQuery($id: ID!) {
    post(id: $id) {
      id
      text
      author {
        nickName
        id
        bio
        profileImg
      }
      reactions(first: 10) {
        edges {
          node {
            id
            reactionType
            author {
              id
              profileImg
              nickName
            }
          }
        }
      }
      comments(first: 10) {
        edges {
          node {
            id
            text
            author {
              id
              profileImg
              nickName
            }
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
        id: params.postId,
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
            <div>{post?.author?.nickName ?? '<unknown user>'}</div>
            <div>{post?.author?.bio ?? 'n00b'}</div>
          </Link>
        </div>

        <Typography variant='h5'>{post?.text}</Typography>

        {/* <div>reactions count: {post?.reactions?.count}</div>
        <div>comments count: {post?.comments?.count}</div> */}
      </Paper>

      {userDetail.data?.isViewerLoggedIn ? (
        <form
          onSubmit={async e => {
            e.preventDefault()
            await addComment({
              variables: {
                input: {
                  text: commentText,
                  postId: params.postId,
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

      <hr />
      {post?.reactions?.edges?.map(c => (
        <div key={c?.node?.id} style={{ display: 'flex', alignItems: 'center' }}>
          <div>{c?.node?.reactionType}</div>
        </div>
      ))}

      <hr />
      {post?.comments?.edges?.map(c => (
        <div key={c?.node?.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={c?.node?.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
            <div>{post?.author?.nickName}</div>
            <div>{c?.node?.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
