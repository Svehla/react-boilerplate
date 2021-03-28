import { Avatar } from '@material-ui/core'
import { Followers_data } from './__generated__/Followers_data'
import { Link } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'

export const FOLLOWERS_DATA_FRAGMENT = gql`
  fragment Followers_data on PublicUser {
    followers(first: 10) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          profileImg
          nickName
        }
      }
    }
  }
`
type Props = {
  data: Followers_data | null | undefined
}

export const Followers = (props: Props) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <div>
        <b>Followers</b>
      </div>
      <div>
        {props.data?.followers?.edges?.map(e => (
          <div key={e?.node?.id}>
            <div style={{ display: 'flex' }}>
              <Avatar src={e?.node?.profileImg ?? ''} />
              <Link to={`/profile/${e?.node?.id}`}>{e?.node?.nickName}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
