import { genericHookContextBuilder } from './utils/genericHookContextBuilder'
import { useState } from 'react'

const useValue = () => {
  const [randomNumbers, setRandomNumbers] = useState([1, 2, 3])

  return {
    randomNumbers,
    setRandomNumbers,
  }
}

export const {
  ContextProvider: GlobalDataContextProvider,
  Context: GlobalDataContext,
} = genericHookContextBuilder(useValue)
