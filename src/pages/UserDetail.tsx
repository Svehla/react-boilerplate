import { Container } from '@material-ui/core'
import { UserDetailContext } from '../globalState/UserDetail'
import React, { useContext } from 'react'

export const UserDetail = () => {
  const data = useContext(UserDetailContext)

  return (
    <Container>
      <div>
        <div>id: {data?.data?.publicUserViewer?.id}</div>
        <div>email: {data?.data?.publicUserViewer?.email}</div>
        <img src={data?.data?.publicUserViewer?.profileImg ?? ''} />
      </div>
    </Container>
  )
}
