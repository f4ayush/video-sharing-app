import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigation, useLocation } from 'react-router-dom'
import { loginBuyer, signUpBuyer } from '../../../actions/login'
import { useDispatch, useSelector } from 'react-redux'
import "../login.css"
import { RESET_LOGIN_ERROR_MESSAGE } from '../../../constants/actionTypes';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Ayush
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const [buyerDetails, setbuyerDetails] = useState({ name: "", email: "", password: "" })
    const [isSignup, setisSignup] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useNavigation()
    const error = useSelector(state=> state.error)
    const isLoading = useSelector(state=> state.isLoading)
    useEffect(() => {
      dispatch({ type: RESET_LOGIN_ERROR_MESSAGE, message:"" })
    }, [])
    
    
    useEffect(() => {
        if(location.pathname.includes("sign-up")){
            setisSignup(true)
        }else{
            setisSignup(false)
        }
        
    }, [location])
    
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email=data.get('email')
      const password=data.get('password')
      const firstName=data.get('firstName')
      const lastName=data.get('lastName')
      
      isSignup ? dispatch(signUpBuyer({email, lastName, firstName, password}, history)) : dispatch(loginBuyer({email, password}, history))
    
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                { isSignup ? "Sign Up" : "Login" }
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {
                isSignup && 
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="name"
                    autoFocus
                  />
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="name"
                      autoFocus
                  />
                </>
              
              }
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type='email'
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ?<CircularProgress size={24} color="inherit"/>: "Sign In" }
              </Button>
              {
                !isSignup && 
                <Grid container>
                  <Grid item xs>
                    <RouterLink to="/forget-password" variant="body2">
                      Forgot password?
                    </RouterLink>
                  </Grid>
                  <Grid item>
                    <RouterLink to="sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </RouterLink>
                  </Grid>
                </Grid>
              }
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  }
  