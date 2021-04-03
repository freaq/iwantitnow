const express = require('express');
const os = require('os');
const {
    exception
} = require('console');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');



const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

server.use(express.static('dist'));

// Create middleware for checking the JWT
// const checkJwt = jwt({
//     // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: process.env.JWT_JWKSURI
//     }),

//     // Validate the audience and the issuer
//     audience: process.env.JWT_AUDIENCE, //replace with your API's audience, available at Dashboard > APIs
//     issuer: process.env.JWT_ISSUER,
//     algorithms: [ 'RS256' ]
//   });


const API = require('./api.js');
const api = new API();

server.get('/api/users/:id', api.getUser);

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
