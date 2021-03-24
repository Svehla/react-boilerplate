import { Button, TextField } from '@material-ui/core'
import { POSTS_FEED_DATA_FRAGMENT, PostsFeed } from '../components/PostsFeed'
import { PageLoader } from '../components/PageLoader'
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
  ${POSTS_FEED_DATA_FRAGMENT}

  query Posts_Query {
    posts(pagination: { limit: 10, offset: 0 }) {
      ...PostsFeed_data
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
          Chceš napsat komentář?
          <a href={appConfig.google.authLoginURL}>TAK SE PŘIHLAŠ!</a>
        </h1>
      )}

      <PostsFeed data={data?.posts} />
    </div>
  )
}
