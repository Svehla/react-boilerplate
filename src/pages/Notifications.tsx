import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Notifications_query } from './__generated__/Notifications_query'
import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'

export const NOTIFICATIONS_QUERY = gql`
  query Notifications_query {
    viewer {
      id

      totalPostsCount

      notificationsCount
      notifications(first: 10) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            message
            urlPath
            read
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`
export const Notifications = () => {
  const { data, loading, error, refetch } = useQuery<Notifications_query>(NOTIFICATIONS_QUERY)

  return (
    <div style={{ marginTop: '2rem' }}>
      <div>
        {data?.viewer?.notifications?.edges?.map(e => (
          <div key={e?.node?.id}>
            <div>
              <Avatar />
              {e?.node?.id}
              <Link to={e?.node?.urlPath ?? '#'}>
                {e?.node?.read ? <div>{e?.node?.message}</div> : <b>{e?.node?.message}</b>}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
