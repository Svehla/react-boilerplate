import { AppDeveloperBar } from './AppDeveloperBar'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Logout as LogoutTypeMutation } from './__generated__/Logout'
import { appEnvs } from '../appConfig'
import { gql, useMutation } from '@apollo/client'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 240

export const LOG_OUT_PUBLIC_USER = gql`
  mutation Logout {
    publicUserLogoutMutation
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function ResponsiveDrawer(props: any) {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const [logOut] = useMutation<LogoutTypeMutation>(LOG_OUT_PUBLIC_USER)

  const logoutPublicUser = async () => {
    await logOut()
    window.location.reload()
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to='/profile'>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'profile'} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to='/'>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'homepage'} />
          </ListItem>
        </Link>
      </List>
    </div>
  )

  const container = window.document.body

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Responsive drawer
          </Typography>

          <Button color='primary' variant='contained' onClick={logoutPublicUser}>
            log out
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {props.children}

        {appEnvs.ENVIRONMENT !== 'production' && <AppDeveloperBar />}
      </main>
    </div>
  )
}

export const Layout = ResponsiveDrawer
