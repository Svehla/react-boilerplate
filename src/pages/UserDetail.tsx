import { Container, Grid } from '@material-ui/core'
import { POSTS_FEED_DATA_FRAGMENT, PostsFeed } from '../components/PostsFeed'
import { UserDetailQuery, UserDetailQueryVariables } from './__generated__/UserDetailQuery'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import React from 'react'

const USER_DETAIL_QUERY = gql`
  ${POSTS_FEED_DATA_FRAGMENT}

  query UserDetailQuery($userId: ID!) {
    publicUser(id: $userId) {
      id
      nickName
      profileImg
    }

    posts(first: 10) {
      ...PostsFeed_data
    }
  }
`

export const UserDetail = () => {
  const params = useParams<{ userId: string }>()

  const { data } = useQuery<UserDetailQuery, UserDetailQueryVariables>(USER_DETAIL_QUERY, {
    variables: {
      userId: params.userId,
    },
  })

  if (!data) {
    return <div>404 user not found</div>
  }

  return (
    <Container>
      <Grid container>
        <Grid item md={4}>
          <div>
            <div>id: {data?.publicUser?.id}</div>
            <div>nickName: {data?.publicUser?.nickName}</div>
            <img src={data?.publicUser?.profileImg ?? ''} />
          </div>
        </Grid>
        <Grid item md={8}>
          <PostsFeed data={data.posts} />
        </Grid>
      </Grid>
    </Container>
  )
}
