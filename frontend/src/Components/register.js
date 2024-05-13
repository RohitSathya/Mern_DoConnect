import React, { useState } from 'react'
import { Container, TextField, Button, Grid,InputAdornment, IconButton } from '@mui/material';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function register() {
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [email,setemail]=useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };

    async function sub(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const check=emailRegex.test(email)
        if(check){
            const response=await axios.post('https://mern-do-connectback-ky47u3jyg-rohits-projects-a5c6d24a.vercel.app/api/user/register',{username:username,email:email,password:password})
            const {message}=response.data
            if(message=='s'){
                navigate('/login')
    
            }
            else{
                toast.warn('User Already exists')
    
            }

        }
        else{
            toast.warn('Wrong Email Format')
        }
      
    }

  return (
    <>
       <ToastContainer />
      <Container maxWidth="sm">
      <div style={{ marginTop: '100px' }}>
        <h2>Registration</h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" variant="outlined" value={username} onChange={(e)=>setusername(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e)=>setemail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <>Hide</> : <>Show</>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={sub}>
                Register
              </Button>
              <Button variant="contained" color="primary" fullWidth onClick={()=>navigate('/login')} style={{marginTop:'10px'}}>
                Already Registered ?  Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>
  )
}
