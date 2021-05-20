
import { Alert } from 'react-bootstrap';
import { Link } from '@material-ui/core'


const UserActivation = () => {
  return (
    <>
      <h1>User Activation</h1>
      <Alert variant='success'>
        You have been succesfuly activated. You can login now!{' '}
        <Link href="/login">
          <a>
            Login
          </a>
        </Link>
      </Alert>
    </>

  )
}

export default UserActivation;
