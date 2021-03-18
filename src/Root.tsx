import { Helmet } from 'react-helmet-async'
import { RootQuery } from './__generated__/RootQuery'
import { gql, useQuery } from '@apollo/client'
import React from 'react'

export const APP_VERSION = gql`
  query RootQuery {
    appVersion
  }
`

export const Root = () => {
  const { data, loading, error } = useQuery<RootQuery>(APP_VERSION)

  if (loading) return <div>loading</div>
  if (error) return <p>ERROR</p>
  if (!data) return <p>Not found</p>

  return (
    <div>
      <Helmet>
        <title>Root title</title>
      </Helmet>

      <h1>App version {data.appVersion}</h1>
    </div>
  )
}
