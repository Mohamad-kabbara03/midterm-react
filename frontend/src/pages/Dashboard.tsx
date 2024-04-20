import React, { useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
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
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language'; // Import the language icon

interface MainProps {
  open: boolean;
}

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
      default: "#333333",
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
      fontSize: "1.5rem",
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
            fontSize: "1.2rem", 
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
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

const drawerWidth = 240;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<MainProps>(({ open }) => {
  const theme = useTheme();
  return {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  };
});

const Dashboard: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor: "#3339a8"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <LanguageIcon /> {/* Language flag icon */}
            </IconButton>
            <Avatar alt="User Name" src="/path/to/user/profile.jpg" /> {/* User profile picture */}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List sx={{marginTop:"10px"}}>
          {['','','User Profile', 'Chats', 'Friends', 'Groups', 'About Us', 'Contact Us'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Drawer>
      <Main open={open}>
        <Toolbar />
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {['User Profile', 'Chats', 'Friends', 'Groups', 'About Us', 'Contact Us'].map((section, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 2 }}>  
                {/* <Paper elevation={3} sx={{ p: 2, backgroundColor: 'rgba(23, 22, 73, 0.9)', backdropFilter: 'blur(8px)', width: '100%', maxWidth: '600px' }}>
                  <Typography paragraph sx={{ textAlign: 'center' }}>
                    Here you can manage your {section.toLowerCase()}.
                  </Typography>
                </Paper> */}
              </Box>
            ))}
            </Container>
      </Main>
      <Box component="footer" sx={{ backgroundColor: "#3339a8", color: "white", padding: "16px", textAlign: "center", mt: "auto" }}>
        &copy; {new Date().getFullYear()} Your Company
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;