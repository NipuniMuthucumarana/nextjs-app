
import { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import { Form, Row, Col, Alert } from 'react-bootstrap';
import useFetch from '../useFetch';
import { useMutate } from "restful-react";

const ResetPassword = () => {
  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState();
  const { mutate: resetPassword, loading, error } = useMutate({
    verb: 'POST',
    path: 'reset-password'
  });
  const {users} = useFetch("http://localhost:5000/data")
  console.log(users)

  const onSubmit = async e => {
    e.preventDefault();
    const rUser = await users.find(user => user.email === email);
      const response = await fetch(`http://localhost:5000/reset-password`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email})
            })

  }
    


  return (
    <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Reset Password</h2>
                </Grid>
                <TextField label='Email' onChange={(e) => setEmail(e.target.value)} id="email" value={email} placeholder='Enter email' fullWidth required />
                <Button type='submit' onClick={(e)=> onSubmit(e)} color='primary' variant="contained" style={btnstyle} fullWidth>Submit</Button>
            </Paper>
        </Grid>
  )
}



export default ResetPassword;
