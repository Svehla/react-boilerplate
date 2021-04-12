import { Button, Container } from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'

export const APP_VERSION = gql`
  query RootQuery {
    appVersion
  }
`

export const Home = () => {
  const {
    data,
    // loading,
    //  error
  } = useQuery<any>(APP_VERSION)

  return (
    <Container>
      <h2>Home</h2>

      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <Button variant='contained'>random button</Button>
    </Container>
  )
}
