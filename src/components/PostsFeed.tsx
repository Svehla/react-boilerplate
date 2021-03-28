import { AccessibleForward, ChildCare, Face, SportsKabaddi } from '@material-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import {
  PostsFeed_data,
  PostsFeed_data_edges_node,
  PostsFeed_data_edges_node_comments,
  PostsFeed_data_edges_node_comments_edges_node,
} from './__generated__/PostsFeed_data'
import { Skeleton } from '@material-ui/lab'
import { gql } from '@apollo/client'
import Post from './Post'

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
          pageInfo {
            hasNextPage
          }
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

export const PostsFeed = ({ loading, data }: Props) => {
  const posts = data?.edges?.map(edge => edge?.node) ?? [] // (Array.from({ length: 4 }) as any)

  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={8} key={index}>
            <Post loading={true} />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      {posts.map(post => (
        <Grid item xs={8} key={post?.id ?? ''}>
          <Post data={post ?? null} loading={loading} />
        </Grid>
      ))}
    </Grid>
  )
}
