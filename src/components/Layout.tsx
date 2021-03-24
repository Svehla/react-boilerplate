import { AppDeveloperBar } from './AppDeveloperBar'
import { AppHeader } from './AppHeader'
import { Container } from '@material-ui/core'
import { appEnvs } from '../appConfig'
import React from 'react'

type Props = {
  children: any
}

export const Layout = (props: Props) => {
  return (
    <div>
      <AppHeader />
      <Container>
        <div>
          {props.children}

          {appEnvs.ENVIRONMENT !== 'production' && <AppDeveloperBar />}
        </div>
      </Container>
    </div>
  )
}
