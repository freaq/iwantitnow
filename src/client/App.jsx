import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import { setApp, setUser } from "./redux/actions.js";
import { useAuth0 } from "@auth0/auth0-react";

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

import MuiContainer from '@material-ui/core/Container';
import MuiGrid from '@material-ui/core/Grid';

import AppBar from './components/AppBar/AppBar.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';

const App = (props) => {

  const auth0 = useAuth0();

  useEffect(() => {

    // IF auth0 is done
    if (!auth0.isLoading) {

      // IF the user is logged in
      // THEN load the user data
      // ELSE load the generic app data
      if (auth0.isAuthenticated) {

        console.log('Auth0 User:');
        console.log(auth0.user);

        auth0.getAccessTokenSilently().then(accessToken => {

          // IF auth0 returned a user
          // AND the user info has not been previously fetched or belongs to a different user
          // THEN load the user data
          if (auth0.user && props.user.auth0UserId !== auth0.user.sub) {

            fetch('/api/users/' + auth0.user.sub, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
              .then(response => response.json())
              .then(user => {
                props.dispatch(setUser(user));
              });
          }
        });
      }
    }
  });

  return (
    <MuiContainer maxWidth="md">
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={12}>
          <AppBar />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <Switch>
            <Route exact path='/' component={() => <HomePage />} />
          </Switch>
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
