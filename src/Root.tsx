import { GlobalDataContext } from './GlobalDataContext'
import { Helmet } from 'react-helmet-async'
import { Logout as LogoutTypeMutation } from './__generated__/Logout'
import { RootQuery } from './__generated__/RootQuery'
import { RootRouter } from './RootRouter'
import { appConfig, appEnvs } from './appConfig'
import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useContext } from 'react'

export const APP_VERSION = gql`
  query RootQuery {
    appVersion

    isPublicUserLoggedIn

    publicUserViewer {
      id
      email
      profileImg
    }
  }
`

export const LOG_OUT_PUBLIC_USER = gql`
  mutation Logout {
    publicUserLogoutMutation
  }
`

export const Root = () => {
  const { data, loading, error } = useQuery<RootQuery>(APP_VERSION)
  const globalData = useContext(GlobalDataContext)

  const [logOut] = useMutation<LogoutTypeMutation>(LOG_OUT_PUBLIC_USER)

  const logoutPublicUser = async () => {
    await logOut()
    window.location.reload()
  }

  if (loading) return <div>loading</div>

  return (
    <div>
      <Helmet>
        <title>Root title</title>
      </Helmet>

      {error && <p>ERROR: {JSON.stringify(error)}</p>}

      <div>app version {appEnvs.APP_VERSION}</div>
      <div>api version {data?.appVersion}</div>

      <div>
        <div>global data: {JSON.stringify(globalData)}</div>
        <button onClick={() => globalData.setRandomNumbers(p => [...p, 1])}>add 1</button>
      </div>

      {!data?.isPublicUserLoggedIn && (
        <a href={appConfig.google.authLoginURL}>
          <button>Login</button>
        </a>
      )}
      {data?.isPublicUserLoggedIn && <button onClick={logoutPublicUser}>log out</button>}

      <div>
        <div>id: {data?.publicUserViewer?.id}</div>
        <div>email: {data?.publicUserViewer?.email}</div>
        <img src={data?.publicUserViewer?.profileImg ?? ''} />
      </div>

      <RootRouter />
    </div>
  )
}
