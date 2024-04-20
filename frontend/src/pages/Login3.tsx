import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Modal,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { setLocalStorageUser } from "../utils/localStorageUtils";
import { Link as RouterLink } from "react-router-dom";
import backgroundImage from "../images/background.png";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#ff5722",
    },
    background: {
      default: "#121212",
      paper: "#424242",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  typography: {
    fontFamily: "Anton, Berkshire Swash, Arial, sans-serif",
    h5: {
      fontWeight: 100,
      color: "#ffffff",
    },
    body1: {
      fontWeight: 400,
      color: "rgba(255, 255, 255, 0.7)",
    },
    body2: {
      fontWeight: 400,
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.7)",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputBase-input": {
            color: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          backgroundColor: "#0d47a1",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },
      },
    },
  },
});

const AnimatedButton = styled(Button)({
  transition: "transform 0.3s ease-in-out, background-color 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#3a42b2",
  },
});

const Header = styled("header")(({ theme }) => ({
  backgroundColor: "#3339a8",
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
}));

const Footer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
  textAlign: "center",
  bottom: 0,
  width: "100%",
}));

const Login3: React.FC<{ onLoginSuccess: () => void }> = ({
  onLoginSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const response = await UserService.authenticate({ email, password });
      if (response?.data?.access_token) {
        setLocalStorageUser({ token: response.data.access_token });
        onLoginSuccess();
        navigate("/Users");
      } else {
        console.error("Authentication failed: Token not found in response");
        setOpen(true);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      setOpen(true);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header> Welcome To Our Chat Application</Header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Paper
            elevation={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              m: 4,
              p: 4,
              borderRadius: "10px",
              maxWidth: "40%", // Increase form width to 40% of the viewport width
              height: "auto", // Set to 'auto' to adjust height based on content, or specify a fixed height
              backgroundColor: "rgba(23, 22, 73, 0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontSize: "35px", fontWeight: "bold", color: "#f3c469" }}
            >
              Log In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
              <AnimatedButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#2c3192",
                  fontSize: "20px",
                }}
              >
                Submit
              </AnimatedButton>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ color: "white" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/signup"
                    variant="body2"
                    sx={{ color: "white" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login information
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Wrong Username/Password...
          </Typography>
        </Box>
      </Modal>
      <Footer>&copy; {new Date().getFullYear()} Your Company</Footer>
    </ThemeProvider>
  );
};

export default Login3;
