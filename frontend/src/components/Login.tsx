import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Router, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import UserService from '../services/UserService';
import { setLocalStorageUser } from '../utils/localStorageUtils';
import { Link as RouterLink } from 'react-router-dom';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface LoginProps {
    onLoginSuccess: () => void;
}

 const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
    
        try {
            const response = await UserService.authenticate({
                email,
                password,
            });
    
            if (response && response.data && response.data.access_token) {
                // Store the access token in localStorage
                setLocalStorageUser({ token: response.data.access_token });

                // Fetch and log the user details
            const userDetailsResponse = await UserService.getUserDetails();
            if (userDetailsResponse && userDetailsResponse.data) {
                console.log('User details:', userDetailsResponse.data);
            }

                // Log the access token
                const storedToken = localStorage.getItem('user_session');
                console.log('Access token:', storedToken);
               

                onLoginSuccess();
                navigate("/Users");
            } else {
                // Handle authentication failure
                console.error('Authentication failed: Token not found in response');
                handleOpen();
            }
        } catch (error) {
            // Handle authentication failure
            console.error('Authentication failed:', error);
            handleOpen();
        }
    };
    

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
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
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
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
                            <div className="signup-link">
        Don't have an account? <Link component={RouterLink} to="/signup">Create a new account</Link>
      </div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Login information 
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Wrong Username/Password ...
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default Login;