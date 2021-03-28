import { Avatar } from '@material-ui/core'
import { Following_data } from './__generated__/Following_data'
import { Link } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'

export const FOLLOWING_DATA_FRAGMENT = gql`
  fragment Following_data on PublicUser {
    following(first: 10) {
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
  data: Following_data | null | undefined
}
export const Following = (props: Props) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <div>
        <b>Following</b>
      </div>
      <div>
        {props.data?.following?.edges?.map(e => (
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
