import React from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import UploadIcon from '@material-ui/icons/CloudUpload';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function NavBar(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const navList = [
    { text: 'Home', icon: <HomeIcon />, to: '/' },
    { text: 'Upload', icon: <UploadIcon />, to: '/upload' },
  ];

  const drawer = (
    <div>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.toolbarButton}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          className={clsx(classes.customLink, classes.invertedPrimaryButtonLink)}
        >
          SimpleTube
        </Typography>
      </Toolbar>
      <List>
        {navList.map(({ text, icon, to }) => (
          <ListItem
            component={RouterNavLink}
            exact
            activeClassName="active-nav-link"
            to={to}
            key={text}
            className={clsx(classes.customLink, classes.primaryButtonLink)}
          >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.navRoot}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={clsx(classes.toolbarButton, classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            className={clsx(classes.customLink, classes.invertedPrimaryButtonLink)}
          >
            SimpleTube
          </Typography>
        </Toolbar>
      </AppBar>
      <nav>
        {/* Drawer for mobile devices */}
        <Hidden smUp >
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* Drawer for tablets and bigger screens */}
        <Hidden xsDown >
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}



export default withStyles(styles)(NavBar);