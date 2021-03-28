import { UserDetailContext } from '../globalState/UserDetailContext'
import { appEnvs } from '../appConfig'
import { makeStyles } from '@material-ui/core/styles'
import { useContext } from 'react'

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '200px',
    height: '50px',
    background: 'red',
    color: 'white',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
}))

export const AppDeveloperBar = () => {
  const userDetail = useContext(UserDetailContext)
  const styles = useStyles()

  return null
  // return (
  //   <div className={styles.wrapper}>
  //     {userDetail.error && <p>ERROR: {JSON.stringify(userDetail.error)}</p>}

  //     <div>app version {appEnvs.APP_VERSION}</div>
  //     <div>api version {userDetail?.data?.appVersion}</div>
  //   </div>
  // )
}
