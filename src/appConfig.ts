import {
  getStringEnumFromEnvParser,
  getStringFromEnvParser,
  validateConfig,
} from 'typed-env-parser'

export const appEnvs = validateConfig({
  BE_URL: getStringFromEnvParser('REACT_APP_BE_URL', { pattern: 'https?://*.' }),
  NODE_ENV: getStringEnumFromEnvParser('NODE_ENV', ['test', 'production', 'development'] as const),
})

export const appConfig = {
  graphqlUrl: `${appEnvs.BE_URL}/graphql` as const,
}
