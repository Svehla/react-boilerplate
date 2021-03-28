import { AppBarNotifications_data } from './__generated__/AppBarNotifications_data'
import { Badge, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { gql } from '@apollo/client'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React from 'react'

export const NOTIFICATIONS_FRAGMENT = gql`
  fragment AppBarNotifications_data on PublicUser {
    notificationsCount
    notifications(first: 10) {
      edges {
        node {
          id
          message
          urlPath
          read
        }
      }
    }
  }
`
type Props = {
  data?: AppBarNotifications_data | null
}

export const AppBarNotifications = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={{ display: 'flex' }}>
      <IconButton color='inherit' onClick={handleClick}>
        <Badge badgeContent={props.data?.notificationsCount ?? 0} color='secondary'>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link to={'/notifications'}>Show all notifications</Link>
        </MenuItem>

        {props.data?.notifications?.edges?.map(i => (
          <MenuItem key={i?.node?.id} onClick={handleClose}>
            <Link to={i?.node?.urlPath ?? ''}>
              {i?.node?.read ? <div>{i?.node?.message}</div> : <b>{i?.node?.message}</b>}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
