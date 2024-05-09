import React from 'react'
import { Container, TextField, Button, Grid,InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function login() {
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };

    async function sub(){
         
      if(username=='admin123' && password=='admin'){
         navigate('/admindashboard')
      }
      else{
        const response=await axios.post('http://localhost:3000/api/user/login',{username:username,password:password})
        
        const {userdetail,token,message}=response.data
        if(message=='s'){
          localStorage.setItem('token',token)
          localStorage.setItem('userdetail',JSON.stringify(userdetail))
          navigate('/home')

        }
        else{
          toast.warn('Wrong credentials')
        }

      }
      

      
       
    }
  return (
    <>
     <>
       <ToastContainer />
      <Container maxWidth="sm">
      <div style={{ marginTop: '100px' }}>
        <h2>Login</h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" variant="outlined" value={username} onChange={(e)=>setusername(e.target.value)}/>
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
                Login
              </Button>
              <Button variant="contained" color="primary" fullWidth onClick={()=>navigate('/')} style={{marginTop:'10px'}}>
                Not Registered ?  SignUp
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>
    </>
  )
}
