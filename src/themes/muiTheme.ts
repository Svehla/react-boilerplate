import { createMuiTheme } from '@material-ui/core/styles'
import { csCZ } from '@material-ui/core/locale'

export const theme = {
  primary: '#222',
  white: '#fff',
} as const

export const muiTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: theme.primary,
      },
    },
    constants: theme,
    overrides: {},
  },
  csCZ
)
