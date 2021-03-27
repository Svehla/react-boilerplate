import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export const PageLoader = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress size={100} />
    </div>
  )
}
