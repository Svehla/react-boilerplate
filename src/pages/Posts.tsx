import { Avatar, Button, Card, Paper, TextField, Typography } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import { PageLoader } from '../components/PageLoader'
import { PostsQuery } from './__generated__/PostsQuery'
import {
  Posts_AddPostMutation,
  Posts_AddPostMutationVariables,
} from './__generated__/Posts_AddPostMutation'
import { Posts_Query } from './__generated__/Posts_Query'
import { UserDetailContext } from '../globalState/UserDetailContext'
import { appConfig } from '../appConfig'
import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'

export const POSTS_QUERY = gql`
  query Posts_Query {
    posts(pagination: { limit: 10, offset: 0 }) {
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

export const ADD_POST_MUTATION = gql`
  mutation Posts_AddPostMutation($input: addPostMutation_args_input_arg!) {
    addPostMutation(input: $input) {
      post {
        id
        text
      }
    }
  }
`

export const Posts = () => {
  const { data, loading, error, refetch } = useQuery<Posts_Query>(POSTS_QUERY)
  const [postText, setPostText] = useState('')
  const userDetail = useContext(UserDetailContext)

  const [addPost] = useMutation<Posts_AddPostMutation, Posts_AddPostMutationVariables>(
    ADD_POST_MUTATION
  )

  if (loading) {
    return <PageLoader />
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      {userDetail.data?.isPublicUserLoggedIn ? (
        <div>
          <form
            onSubmit={async e => {
              e.preventDefault()

              try {
                await addPost({
                  variables: {
                    input: {
                      text: postText,
                    },
                  },
                })

                setPostText('')

                refetch()
              } catch (err) {
                alert(JSON.stringify(err.message))
              }
            }}
          >
            <TextField
              label='Přidat post'
              onChange={e => {
                setPostText(e.target.value)
              }}
              value={postText}
              type='text'
              disabled={loading}
            />

            <Button type='submit'>odeslat</Button>
          </form>
        </div>
      ) : (
        <h1>
          Chceš napsat komentář?
          <a href={appConfig.google.authLoginURL}>TAK SE PŘIHLAŠ!</a>
        </h1>
      )}
      <div>
        {(data?.posts?.items ?? []).map(p => (
          <div key={p.id} style={{ marginBottom: '50px' }}>
            <Paper style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={p.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
                <Link to={`/profile/${p.author?.id}`}>{p.author?.email ?? '<unknown user>'}</Link>
              </div>

              <Typography variant='h5'>{p.text}</Typography>

              <div>reactions count: {p.reactions?.count}</div>
              <div>comments count: {p.comments?.count}</div>
              <Link to={`/posts/${p.id}`}>detail</Link>
            </Paper>
          </div>
        ))}
        <div>only last 10 posts are shown</div>
      </div>
    </div>
  )
}
