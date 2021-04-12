import { Container } from '@material-ui/core'

type Props = {
  children: any
}

export const Layout = (props: Props) => {
  return (
    <div>
      <Container>
        <div>{props.children}</div>
      </Container>
    </div>
  )
}
