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
import { PostsFeed_data_edges_node } from './__generated__/PostsFeed_data'
import { Skeleton } from '@material-ui/lab'
import Comment from './Comment'

type Props = {
  loading: boolean
  data?: PostsFeed_data_edges_node | null
}

const useStyles = makeStyles(theme => ({
  allCommentsBox: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  detailButton: {
    marginLeft: 'auto',
    marginRight: '8px',
  },
}))

const Post = ({ loading, data }: Props) => {
  const history = useHistory()
  const styles = useStyles()
  const author = data?.author
  const hasAllCommentsRendered = !data?.comments?.pageInfo?.hasNextPage
  const comments = data?.comments?.edges?.map(edge => edge?.node) ?? []

  if (loading) {
    return (
      <Card>
        <CardHeader
          avatar={<Skeleton variant='circle' width={40} height={40} />}
          title={<Skeleton height={10} width='40%' />}
        />
        <CardContent>
          <Skeleton height={80} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <Link to={`/profile/${author?.id ?? ''}`}>
        <CardHeader
          avatar={<Avatar src={author?.profileImg ?? ''} />}
          title={author?.nickName ?? ''}
          subtitle={author?.bio ?? ''}
        />
      </Link>
      <CardContent>
        <Typography variant='h5'>{data?.text}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <AccessibleForward />
        </IconButton>
        <IconButton>
          <Face />
        </IconButton>
        <IconButton>
          <SportsKabaddi />
        </IconButton>
        <IconButton>
          <ChildCare />
        </IconButton>
        <Button
          className={styles.detailButton}
          onClick={() => history.push(`/posts/${data?.id ?? ''}`)}
        >
          Přečíst celý příspěvek
        </Button>
      </CardActions>
      <Divider light />
      <Grid container spacing={0}>
        {comments.map((comment, index) => (
          <Grid item xs={12} key={comment?.id ?? ''}>
            {index !== 0 && <Divider light />}
            <Comment data={comment} />
          </Grid>
        ))}
        {!hasAllCommentsRendered && (
          <>
            <Box className={styles.allCommentsBox}>
              <Divider light />

              <Link to={`/posts/${data?.id}`}>
                <Button size='small'>Všechny komentáře</Button>
              </Link>
            </Box>
          </>
        )}
      </Grid>
    </Card>
  )
}

export default Post
