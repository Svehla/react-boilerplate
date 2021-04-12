import {
  getStringEnumFromEnvParser,
  getStringFromEnvParser,
  validateConfig,
} from 'typed-env-parser'

export const appEnvs = validateConfig({
  BE_URL: getStringFromEnvParser('REACT_APP_BE_URL', { pattern: 'https?://*.' }),
  NODE_ENV: getStringEnumFromEnvParser('NODE_ENV', ['test', 'production', 'development'] as const),
  ENVIRONMENT: getStringEnumFromEnvParser('REACT_APP_ENVIRONMENT', [
    'production',
    'stage-1',
  ] as const),
  APP_VERSION: getStringFromEnvParser('REACT_APP_VERSION'),
})

const googleAuthLoginPath = '/auth/google' as const

export const appConfig = {
  graphqlUrl: `${appEnvs.BE_URL}/graphql` as const,

  google: {
    authLoginURL: `${appEnvs.BE_URL}${googleAuthLoginPath}` as const,
  },
}
