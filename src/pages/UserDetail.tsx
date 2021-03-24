import { Container } from '@material-ui/core'
import { UserDetailQuery, UserDetailQueryVariables } from './__generated__/UserDetailQuery'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import React from 'react'

const USER_DETAIL_QUERY = gql`
  query UserDetailQuery($userId: Int!) {
    publicUser(id: $userId) {
      id
      email
      profileImg
    }
  }
`

export const UserDetail = () => {
  const params = useParams<{ userId: string }>()

  const { data } = useQuery<UserDetailQuery, UserDetailQueryVariables>(USER_DETAIL_QUERY, {
    variables: {
      userId: parseFloat(params.userId),
    },
  })

  if (!data) {
    return <div>404 user not found</div>
  }

  return (
    <Container>
      <div>
        <div>id: {data?.publicUser?.id}</div>
        <div>email: {data?.publicUser?.email}</div>
        <img src={data?.publicUser?.profileImg ?? ''} />
      </div>
    </Container>
  )
}
