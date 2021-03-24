import { AppBarNotifications, NOTIFICATIONS_FRAGMENT } from './AppBarNotifications'
import { AppHeader_Query } from './__generated__/AppHeader_Query'
import { Avatar, Button, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Logout as LogoutTypeMutation } from './__generated__/Logout'
import { Theme, createStyles, fade, makeStyles } from '@material-ui/core/styles'
import { appConfig } from '../appConfig'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router'
import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreIcon from '@material-ui/icons/MoreVert'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      marginBottom: '2rem',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
)

export const LOG_OUT_PUBLIC_USER = gql`
  mutation Logout {
    publicUserLogoutMutation
  }
`

export const APP_HEADER_QUERY = gql`
  ${NOTIFICATIONS_FRAGMENT}

  query AppHeader_Query {
    isPublicUserLoggedIn
    publicUserViewer {
      id
      bio
      nickName
      profileImg
      ...AppBarNotifications_data
    }
  }
`

export const AppHeader = () => {
  const { data, loading, error } = useQuery<AppHeader_Query>(APP_HEADER_QUERY)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

  const history = useHistory()
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const [logout] = useMutation<LogoutTypeMutation>(LOG_OUT_PUBLIC_USER)

  const logoutPublicUser = async () => {
    await logout()
    window.location.reload()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push(`/profile/${data?.publicUserViewer?.id}`)}>
        Profile
      </MenuItem>
      <MenuItem onClick={logoutPublicUser}>Log out</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/*
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      */}
      <MenuItem style={{ display: 'flex' }}>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <Avatar src={data?.publicUserViewer?.profileImg ?? ''} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
              <Typography className={classes.title} variant='h6' noWrap>
                Daily faily
              </Typography>
            </Link>
            {/*
             <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            */}
            <div className={classes.grow} />
            {data?.isPublicUserLoggedIn ? (
              <div className={classes.sectionDesktop}>
                {/* 
                <IconButton aria-label='show 4 new mails' color='inherit'>
                  <Badge badgeContent={4} color='secondary'>
                    <MailIcon />
                  </Badge>
                </IconButton>
                */}

                <AppBarNotifications data={data.publicUserViewer} />

                <IconButton
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <Avatar src={data?.publicUserViewer?.profileImg ?? ''} />
                </IconButton>
              </div>
            ) : (
              <div>
                <a href={appConfig.google.authLoginURL}>
                  <Button color={'primary'} style={{ color: 'white', textDecoration: 'none' }}>
                    Přihlásit se
                  </Button>
                </a>
              </div>
            )}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
