import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Badge, Avatar, Tooltip, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatarNav.svg'
import { logout } from '../stores/authStore';
import NotificationPopup from './NotificationPopup';

const Navbar = ({ toggleTheme, isDarkMode, isAuthenticated, user }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false); // Estado para el popup de notificaciones
    const [alertOpen, setAlertOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleNotifications = () => {
        setNotificationOpen(true);
        setAlertOpen(true);
    };

    const handleCloseNotification = () => {
        setNotificationOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    {/* Navigation links */}
                    {/* Instructions:
                        - Implement navigation links for authenticated and unauthenticated users.
                        - If the user is authenticated, show links like "Dashboard", "Settings", and a "Logout" button.
                        - If the user is not authenticated, show "Login" and "Register" links. 
                        - Use the `Link` component from `react-router-dom`. */}
                    <Box sx={{flexGrow:1}}>
                        {(isAuthenticated) ?
                        <Box sx={{textAlign:'center'}}>
                            <Link to={'/'} style={{color:'inherit',textDecoration:'none',marginRight:'3em'}}>Dashboard</Link>
                            <Link to={'/settings'} style={{color:'inherit',textDecoration:'none',marginRight:'3em'}}>Settings</Link>
                            <Link onClick={logout} style={{color:'inherit',textDecoration:'none'}}>Logout</Link>
                        </Box>
                        :
                        <Box sx={{textAlign:'right', mr:5}}>
                            <Link to={'/login'} style={{color:'inherit',textDecoration:'none',marginRight:'2em'}}>Login</Link>
                            <Link to={'/register'} style={{color:'inherit',textDecoration:'none'}}>Register</Link>
                        </Box>}
                    </Box>
                    
                    <Box>
                        {/* User avatar */}
                        {/* Instructions:
                            - Display the user's avatar if they are logged in.
                            - Use an Avatar component and display the user's email as a tooltip or alt text. */}
                        {
                        (isAuthenticated) ? 
                            <>
                                <Box sx={{display:'flex',alignItems:'center'}}>
                                    <Box>
                                        <IconButton onClick={handleNotifications}>
                                            <Badge color="error" variant="dot">
                                                <NotificationsIcon />
                                            </Badge>
                                        </IconButton>
                                        <NotificationPopup 
                                            open={notificationOpen} 
                                            message="¡Tienes nuevas notificaciones!"
                                            onClose={handleCloseNotification}
                                        />
                                    </Box>
                                    <Tooltip title={user.email}>
                                        <IconButton>
                                            <Avatar src={avatar} alt='avatar user'></Avatar>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <div/>
                            </>
                        : 
                            <></>
                        }
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)} // Close drawer on item click
                    onKeyDown={toggleDrawer(false)} // Close drawer on keyboard navigation
                    sx={{ width: 250 }} // Width of the drawer
                >
                    <List>
                        {/* Conditional rendering of links based on authentication status */}
                        {isAuthenticated ? (
                            <>
                                <ListItem button component={Link} to="/">
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                                <ListItem button component={Link} to="/transactions">
                                    <ListItemText primary="Transactions" />
                                </ListItem>
                                <ListItem button component={Link} to="/settings">
                                    <ListItemText primary="Settings" />
                                </ListItem>
                                <ListItem button component={Link} onClick={logout}>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem button component={Link} to="/login">
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <ListItem button component={Link} to="/register">
                                    <ListItemText primary="Register" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};
export default Navbar;