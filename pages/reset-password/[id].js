
import { useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import { useMutate } from "restful-react";
import { useRouter } from 'next/router';

const ResetPasswordConfirmation = () => {
  const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}
  const router = useRouter();
  const { id } = router.query
  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  });
  
  const onSubmit = async e => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/reset-password/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
    setData({
      password: "",
      confirmPassword: ""
    })
  }

  const handleChange = e => {
    const { id, value } = e.target
    setData({
        ...data,
        [id]: value
    })
}

  return (
    <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Reset Your Password</h2>
                </Grid>
                <TextField label='Password' value={data.password} onChange={(e)=>handleChange(e)} id="password" placeholder='Enter password' type='password' fullWidth required />
                <TextField label='Confirm Password' value={data.confirmPassword} onChange={(e)=>handleChange(e)} id="confirmPassword" placeholder='Confirm password' type='password' fullWidth required />
                <Button type='submit' onClick={(e)=> onSubmit(e)} color='primary' variant="contained" style={btnstyle} fullWidth>Submit</Button>
            </Paper>
        </Grid>
  )
}



export default ResetPasswordConfirmation;
