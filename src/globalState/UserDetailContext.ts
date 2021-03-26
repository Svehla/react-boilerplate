import { RootQuery } from './__generated__/RootQuery'
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder'
import { gql, useQuery } from '@apollo/client'

export const APP_VERSION = gql`
  query RootQuery {
    appVersion

    isViewerLoggedIn

    viewer {
      id
      nickName
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
