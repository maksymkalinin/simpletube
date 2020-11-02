import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavBar from './NavBar';
import HomeComponent from './Home';
import UploadComponent from './Upload';
import Container from '@material-ui/core/Container';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function App(props) {
  const { classes } = props;

  return (
    <Router>
      <NavBar />
      <Container className={classes.root}>
        <Switch>
          <Route path='/' exact component={HomeComponent} />
          <Route path='/upload' component={UploadComponent} />
        </Switch>
      </Container>
    </Router>
  );
}

export default withStyles(styles)(App);
