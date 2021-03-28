import { Card, CardContent, Grid } from '@material-ui/core'
import { POSTS_FEED_DATA_FRAGMENT, PostsFeed } from '../components/PostsFeed'
import { Posts_Query } from './__generated__/Posts_Query'
import { UserDetailContext } from '../globalState/UserDetailContext'
import { gql, useQuery } from '@apollo/client'
import { useContext } from 'react'
import CreatePostForm from '../components/CreatePostForm'

export const POSTS_QUERY = gql`
  ${POSTS_FEED_DATA_FRAGMENT}

  query Posts_Query {
    posts(first: 10) {
      ...PostsFeed_data
    }
  }
`

export const Posts = () => {
  const { data, loading, refetch } = useQuery<Posts_Query>(POSTS_QUERY)
  const userDetail = useContext(UserDetailContext)

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <CreatePostForm
              loading={loading}
              refetch={refetch}
              isLogged={userDetail?.data?.isViewerLoggedIn ?? false}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <PostsFeed loading={loading} data={data?.posts} />
      </Grid>
    </Grid>
  )
}
