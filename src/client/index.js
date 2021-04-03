import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AUTH0PROVIDER_DOMAIN, AUTH0PROVIDER_CLIENTID } from './constants.js';

ReactDOM.render((
    <Auth0Provider
        domain={AUTH0PROVIDER_DOMAIN}
        clientId={AUTH0PROVIDER_CLIENTID}
        redirectUri={window.location.origin}>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </Auth0Provider>
), document.getElementById('root'));
