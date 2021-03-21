import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { theme } from './themes/muiTheme'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    constants: typeof theme
  }

  interface ThemeOptions {
    constants: typeof theme
  }
}

declare global {
  interface Window {
    theme: any
  }
}

declare module '*.png' {
  const value: string
  export default value
}
