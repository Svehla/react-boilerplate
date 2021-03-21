import { RootQuery } from './__generated__/RootQuery'
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

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

const useValue = () => {
  const { data, loading, error } = useQuery<RootQuery>(APP_VERSION)

  return {
    loading,
    error,
    data,
  }
}

export const {
  ContextProvider: UserDetailContextProvider,
  Context: UserDetailContext,
} = genericHookContextBuilder(useValue)
