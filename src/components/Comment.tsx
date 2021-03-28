import { Avatar, Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { PostsFeed_data_edges_node_comments_edges_node } from './__generated__/PostsFeed_data'

const useStyles = makeStyles(theme => ({
  comment: {
    padding: theme.spacing(2),
  },
}))

type Props = {
  data?: PostsFeed_data_edges_node_comments_edges_node | null
}

const Comment = ({ data }: Props) => {
  const styles = useStyles()
  const author = data?.author

  return (
    <Box className={styles.comment}>
      <Grid container spacing={2}>
        <Grid item>
          <Link to={`/profile/${author?.id ?? ''}`}>
            <Avatar src={author?.profileImg ?? ''} />
          </Link>
        </Grid>
        <Grid item>
          <Link to={`/profile/${author?.id ?? ''}`}>
            <Typography variant='subtitle2'>{author?.nickName ?? ''}</Typography>
          </Link>
          <Typography>{data?.text ?? ''}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Comment
