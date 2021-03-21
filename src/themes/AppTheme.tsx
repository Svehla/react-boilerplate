import { MuiThemeProvider, useTheme } from '@material-ui/core/styles'
import { muiTheme } from './muiTheme'
import React from 'react'

type Props = {
  children: React.ReactNode
}

// inspiration from material.ui public web page to debug theme directly from dev console `window`
const InjectThemeToWindow = () => {
  const theme = useTheme()
  window.theme = theme

  return <React.Fragment />
}

export const AppTheme = ({ children }: Props) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <>{children}</>
      <InjectThemeToWindow />
    </MuiThemeProvider>
  )
}
