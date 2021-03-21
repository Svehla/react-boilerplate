import { createMuiTheme } from '@material-ui/core/styles'
import { csCZ } from '@material-ui/core/locale'

const primary = '#775C8E'

export const theme = {
  primary,
  white: '#fff',
} as const

export const muiTheme = createMuiTheme(
  {
    constants: theme,
    overrides: {},
  },
  csCZ
)
