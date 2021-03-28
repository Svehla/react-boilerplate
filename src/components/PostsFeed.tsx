import { Avatar, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { PostsFeed_data } from './__generated__/PostsFeed_data'
import { Skeleton } from '@material-ui/lab'
import { gql } from '@apollo/client'
import React from 'react'

export const POSTS_FEED_DATA_FRAGMENT = gql`
  fragment PostsFeed_data on cursor_connection_query_posts {
    edges {
      node {
        id
        text
        author {
          id
          nickName
          bio
          profileImg
        }
        reactions(first: 10) {
          edges {
            node {
              id
            }
          }
        }
        comments(first: 2) {
          edges {
            node {
              id
              text
              author {
                id
                nickName
                profileImg
              }
            }
          }
        }
      }
    }
  }
`

type Props = {
  data?: PostsFeed_data | null
  loading: boolean
}

export const PostsFeed = (props: Props) => {
  const posts = props.loading ? [null, null, null, null] : props.data?.edges // (Array.from({ length: 4 }) as any)

  return (
    <div>
      {(posts ?? []).map((p, idx) => (
        <div key={p?.node?.id ?? idx} style={{ marginBottom: '50px' }}>
          <Paper style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {props.loading ? (
                <Skeleton variant='circle' width={40} height={40} style={{ margin: '1rem' }} />
              ) : (
                <Avatar src={p?.node?.author?.profileImg ?? ''} style={{ margin: '1rem' }} />
              )}

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to={props.loading ? '#' : `/profile/${p?.node?.author?.id}`}>
                  {props.loading ? <Skeleton width={200} /> : p?.node?.author?.nickName}
                </Link>
                <div>{props.loading ? <Skeleton /> : p?.node?.author?.bio}</div>
              </div>
            </div>

            <Typography variant='h5'>{props.loading ? <Skeleton /> : p?.node?.text}</Typography>

            <Link to={props.loading ? `#` : `/posts/${p?.node?.id}`}>detail</Link>
          </Paper>
          {!props.loading && (
            <Paper>
              {p?.node?.comments?.edges?.map((c, i) => (
                <div key={c?.node?.id ?? i} style={{ display: 'flex', padding: '0.5rem' }}>
                  <Avatar src={c?.node?.author?.profileImg ?? ''} />
                  <Link to={`/profile/${c?.node?.author?.id}`}>{c?.node?.author?.nickName}</Link>

                  {c?.node?.text}
                </div>
              ))}
              <Link to={props.loading ? `#` : `/posts/${p?.node?.id}`}>
                Zobrazit všechny komentáře
              </Link>
            </Paper>
          )}
        </div>
      ))}
    </div>
  )
}
