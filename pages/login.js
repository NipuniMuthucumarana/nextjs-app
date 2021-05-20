import { useState, useEffect } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useFetch from './useFetch';

const Login = () => {
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const {users} = useFetch("http://localhost:5000/login")

    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = e => {
        const { id, value } = e.target
        setData({
            ...data,
            [id]: value
        })
        /* const newData = { ...data };
        newData[e.target.id] = e.target.value
        setData(newData) */
    }

    const onLogin = async e => {
        e.preventDefault();
        try {
           
            const login = users.find(user => user.username === data.username) && users.find(user => user.password === data.password);
            if (login) {
                console.log("successful login")
            }
            setData({
                username: "",
                password: ""
            })
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return ( 
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' id="username" value={data.username} placeholder='Enter username' fullWidth required onChange={(e)=>handleChange(e)}/>
                <TextField label='Password' id="password" value={data.password} placeholder='Enter password' type='password' fullWidth required onChange={(e)=>handleChange(e)}/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />

                <Button type='submit' onClick={(e)=>onLogin(e)} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="/register" >
                        Sign Up 
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    );
}
 
export default Login;