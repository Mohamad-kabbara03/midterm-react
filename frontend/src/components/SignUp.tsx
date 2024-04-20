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
const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [description, setDescription] = useState("");
  const [languagePreference, setLanguagePreference] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await UserService.registerUser({
        username,
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        description,
        languagePreference,
      });
      console.log("Signup successful");
      navigate("/login"); // Navigate to login page after successful signup
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header>Sign Up</Header>
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
              height: "auto",
              backgroundColor: "rgba(23, 22, 73, 0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            {error && <Typography color="error">{error}</Typography>}
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                required
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                label="Language Preference"
                type="text"
                value={languagePreference}
                onChange={(e) => setLanguagePreference(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <AnimatedButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </AnimatedButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/login3"
                    variant="body2"
                    sx={{ color: "white" }}
                  >
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer>&copy; {new Date().getFullYear()} Your Company</Footer>
    </ThemeProvider>
  );
};

export default Signup;
