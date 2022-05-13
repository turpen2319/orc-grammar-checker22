import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as userService from '../../utilities/users-service'
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

export default function ResponsiveDrawer({ window, bodyComponent, user, setUser }) {
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  function handleLogOut() {
    // Delegate to the user-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <Toolbar /> PUT LOGO HERE INSTEAD */}
      <Divider />
      <List>
          <ListItem key={'Home'} disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Add Photo'} disablePadding>
            <ListItemButton onClick={() => navigate('/webcam')}>
              <ListItemIcon>
                <AddAPhotoRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'New'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={'Logout'} disablePadding>
            <ListItemButton onClick={handleLogOut}>
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} secondary={`${user.email}`}/>
            </ListItemButton>
          </ListItem>
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Grammar Vision
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* THIS IS WHERE I'M PASSING MY MAIN BODY COMPONENT SO IT RENDERS NICELY WITHIN THE DRAWER/NAVBAR */}
        {bodyComponent}
      </Box>
    </Box>
  );
}



