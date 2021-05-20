import { useState, useEffect } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import useFetch from './useFetch';
//import validateInfo from '../validateInfo';
//import emailjs from 'emailjs-com'

const Register = () => {
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const {users} = useFetch("http://localhost:5000/data")
    

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState("")

    const handleChange = e => {
        const { id, value } = e.target
        setData({
            ...data,
            [id]: value
        })
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            console.log(users)
            const rUser = await users.find(user => user.email === data.email);
            
            //await sendConfirmationEmail({toUser: data.row[0], hash: data.row[0].username })
            //setErrors(validateInfo(data))
            
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })

            if (rUser) { return 'User is already registered!';} 
           
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return (  
        <Grid>
            <Paper elevation={10} style={paperStyle}>
            <form onSubmit={(e)=>onSubmitForm(e)}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOpenOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                
                <TextField label='First name' id="firstname" value={data.firstname} placeholder='Enter firstname' fullWidth required onChange={(e)=>handleChange(e)}/>
                <TextField label='Last name' id="lastname" value={data.lastname} placeholder='Enter lastname' fullWidth required onChange={(e)=>handleChange(e)}/>
                <TextField label='Email' id="email" value={data.email} placeholder='Enter mail' type='email' fullWidth required onChange={(e)=>handleChange(e)}/>
                <TextField label='Username' id="username" value={data.username} placeholder='Enter username' fullWidth required onChange={(e)=>handleChange(e)}/>
                <TextField label='Password' id="password" value={data.password} placeholder='Enter password' type='password' fullWidth required onChange={(e)=>handleChange(e)}/>
                <TextField label='Confirm Password' id="confirmPassword" value={data.confirmPassword} placeholder='Confirm password' type='password' fullWidth required onChange={(e)=>handleChange(e)}/>
                
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign up</Button>
                
                <Typography > Already registered ? 
                <Link href="/login" >
                        Sign In
                </Link>
                </Typography>
                </form>
            </Paper>
        </Grid>
    );
}
 
export default Register;