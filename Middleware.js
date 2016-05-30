//-------------Application-level middleware-------------------
//This example shows a middleware function with no mount path.
//The function is executed every time the app receives a request.
var app = express();

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

//This example shows a middleware function mounted on the /user/:id path.
//The function is executed for any type of HTTP request on the /user/:id path.
app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

//Here is an example of loading a series of middleware functions at a mount point, with a mount path.
//It illustrates a middleware sub-stack that prints request info for any type of HTTP request to the /user/:id path.
app.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

//---------------------------------------------------------------
//------------Router-level middleware----------------------------
//Router-level middleware works in the same way as application-level middleware,
//except it is bound to an instance of express.Router().
var router = express.Router();

//The following example code replicates the middleware system
//that is shown above for application-level middleware, by using router-level middleware:
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

//---------------------------------------------------------------
//------------Third party middleware----------------------------
/*
 Use third-party middleware to add functionality to Express apps.
 Install the Node.js module for the required functionality,
 then load it in your app at the application level or at the router level.
 The following example illustrates installing and loading the cookie-parsing
 middleware function cookie-parser.
 */

//$ npm install cookie-parser
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
//