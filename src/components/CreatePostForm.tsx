import { Button, Grid, TextField } from '@material-ui/core'
import {
  Posts_AddPostMutation,
  Posts_AddPostMutationVariables,
} from '../pages/__generated__/Posts_AddPostMutation'
import { Skeleton } from '@material-ui/lab'
import { appConfig } from '../appConfig'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

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

type Props = {
  isLogged: boolean
  loading: boolean
  refetch: () => void
}

const CreatePostForm = ({ isLogged, loading, refetch }: Props) => {
  const [addPost] = useMutation<Posts_AddPostMutation, Posts_AddPostMutationVariables>(
    ADD_POST_MUTATION
  )

  const [postText, setPostText] = useState('')

  if (loading) {
    return <Skeleton variant='rect' width={'100%'} height={150} />
  }

  if (!isLogged) {
    return (
      <h1>
        Chceš napsat komentář?
        <a href={appConfig.google.authLoginURL}>TAK SE PŘIHLAŠ!</a>
      </h1>
    )
  }

  return (
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
        } catch (err) {
          alert(JSON.stringify(err.message))
        }

        refetch()
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            rows={4}
            multiline
            fullWidth
            placeholder='Tvůj dnešní fail?'
            onChange={e => {
              setPostText(e.target.value)
            }}
            value={postText}
            type='text'
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            odeslat
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default CreatePostForm
