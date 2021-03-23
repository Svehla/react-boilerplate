import { createMuiTheme } from '@material-ui/core/styles'
import { csCZ } from '@material-ui/core/locale'

export const theme = {
  primary: 'blue',
  secondary: 'yellow',
  white: '#fff',
} as const

export const muiTheme = createMuiTheme(
  {
    constants: theme,
    overrides: {},
  },
  csCZ
)
