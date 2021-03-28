import { Button, Container, Grid } from '@material-ui/core'
import { FOLLOWERS_DATA_FRAGMENT, Followers } from './Followers'
import { FOLLOWING_DATA_FRAGMENT, Following } from './Following'
import {
  FOLLOW_BUTTON_PUBLIC_USER_FRAGMENT,
  FOLLOW_BUTTON_VIEWER_FRAGMENT,
  FollowButton,
} from './FollowButton'
import { POSTS_FEED_DATA_FRAGMENT, PostsFeed } from '../../components/PostsFeed'
import { UserDetailQuery, UserDetailQueryVariables } from '../__generated__/UserDetailQuery'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import React from 'react'

const USER_DETAIL_QUERY = gql`
  ${POSTS_FEED_DATA_FRAGMENT}
  ${FOLLOWING_DATA_FRAGMENT}
  ${FOLLOWERS_DATA_FRAGMENT}
  ${FOLLOW_BUTTON_VIEWER_FRAGMENT}
  ${FOLLOW_BUTTON_PUBLIC_USER_FRAGMENT}

  query UserDetailQuery($userId: ID!) {
    viewer {
      id
      ...FollowButton_viewerData
    }

    publicUser(id: $userId) {
      id
      nickName
      profileImg

      ...Followers_data
      ...Following_data
      ...FollowButton_userDetailData
    }

    posts(first: 10, authorId: $userId) {
      ...PostsFeed_data
    }
  }
`

export const UserDetail = () => {
  const params = useParams<{ userId: string }>()

  const { data, loading, error, refetch } = useQuery<UserDetailQuery, UserDetailQueryVariables>(
    USER_DETAIL_QUERY,
    {
      variables: {
        userId: params.userId,
      },
    }
  )

  if (!data && !error && !loading) {
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

          <FollowButton
            refetch={refetch}
            // @ts-expect-error
            viewerData={data?.viewer}
            // @ts-expect-error
            userDetailData={data?.publicUser}
            loading={loading}
          />
          <Following
            // @ts-expect-error
            data={data?.publicUser}
          />
          <Followers
            // @ts-expect-error
            data={data?.publicUser}
          />
        </Grid>
        <Grid item md={8}>
          <PostsFeed
            // @ts-expect-error
            data={data?.posts}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
