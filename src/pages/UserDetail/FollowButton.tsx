import { Button, Container, Grid } from '@material-ui/core'
import {
  DeleteFollowPublicUser,
  DeleteFollowPublicUserVariables,
} from './__generated__/deleteFollowPublicUser'
import { FOLLOWERS_DATA_FRAGMENT, Followers } from './Followers'
import { FOLLOWING_DATA_FRAGMENT, Following } from './Following'
import {
  FollowButton_MutationVariables,
  FollowButton_Mutation_addFollowPublicUser,
} from './__generated__/FollowButton_Mutation'
import { FollowButton_userDetailData } from './__generated__/FollowButton_userDetailData'
import { FollowButton_viewerData } from './__generated__/FollowButton_viewerData'
import { POSTS_FEED_DATA_FRAGMENT, PostsFeed } from '../../components/PostsFeed'
import { RemoveFromQueue } from '@material-ui/icons'
import { UserDetailQuery, UserDetailQueryVariables } from '../__generated__/UserDetailQuery'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import React from 'react'

export const FOLLOW_BUTTON_PUBLIC_USER_FRAGMENT = gql`
  fragment FollowButton_userDetailData on PublicUser {
    id
    amIFollowing
  }
`

export const FOLLOW_BUTTON_VIEWER_FRAGMENT = gql`
  fragment FollowButton_viewerData on PublicUser {
    id
  }
`

const FOLLOW_USER_MUTATION = gql`
  mutation FollowButton_Mutation($input: addFollowPublicUser_input_input_arg!) {
    addFollowPublicUser(input: $input) {
      startsFollow
    }
  }
`

const DELETE_FOLLOW_USER_MUTATION = gql`
  mutation DeleteFollowPublicUser($input: deleteFollowPublicUser_input_input_arg!) {
    deleteFollowPublicUser(input: $input) {
      stopsFollow
    }
  }
`

type Props = {
  viewerData: FollowButton_viewerData | null | undefined
  userDetailData: FollowButton_userDetailData | null | undefined
  loading: boolean
  refetch: () => void
}
export const FollowButton = (props: Props) => {
  const params = useParams<{ userId: string }>()

  const [addFollow] = useMutation<
    FollowButton_Mutation_addFollowPublicUser,
    FollowButton_MutationVariables
  >(FOLLOW_USER_MUTATION)

  const [deleteFollow] = useMutation<DeleteFollowPublicUser, DeleteFollowPublicUserVariables>(
    DELETE_FOLLOW_USER_MUTATION
  )

  if (props.loading) {
    return <div>loading</div>
  }

  if (props.viewerData?.id === props.userDetailData?.id) {
    return <h1>its me</h1>
  }

  return (
    <div>
      {props.userDetailData?.amIFollowing ? (
        <Button
          onClick={async () => {
            try {
              await deleteFollow({ variables: { input: { followingId: params.userId } } })
            } catch (err) {
              alert(err)
            }

            props.refetch()
          }}
        >
          Un Follow
        </Button>
      ) : (
        <Button
          onClick={async () => {
            try {
              await addFollow({ variables: { input: { toFollowId: params.userId } } })
            } catch (err) {
              alert(err)
            }

            props.refetch()
          }}
        >
          Follow
        </Button>
      )}
    </div>
  )
}
