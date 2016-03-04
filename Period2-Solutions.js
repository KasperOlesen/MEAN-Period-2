/**
 * Created by Kasper on 03-03-2016.
 */
//
//————————————————————————————————————————————————————————————————
//	PERIOD 2 HAND-IN
//————————————————————————————————————————————————————————————————
//
//
//————————————————————————————————————————————————————————————————
//	1 - Why would you consider a scripting language as JavaScript as your backend platform?
//————————————————————————————————————————————————————————————————
/*
 It depends. If my backend would be big, complex and need a lot of structure
 I would probably write the backend in Java instead, since that is what Java does.
 It’s structured, it delivers solid engineering and architecture.
 Scripting languages, like JavaScript, are super fast, it doesn’t have to be compiled and sometimes measured
 up to 20x faster than code written in Java or any other alternative. It’s simple and flexible.
 */
//
//————————————————————————————————————————————————————————————————
//	2 - Explain pros & cons in using Node.js + Express to implement your backend compared
//	to a strategy using for example java/jax-rs/tomcat
//————————————————————————————————————————————————————————————————
//
/*
 PROS
 _____________________________________________________________________

 You can write code that works on both server and in the browser.
 This way you will not have to first write everything in Java and then
 later on everthing again in JavaScript on the other side of
 your system. Working with Node.js you need not to divide your
 client/server relationship, meaning that you can move business logic as you pleases.

 With JavaScript, code is much easier to migrate.

 When making a build in Node.js you	need not to switch programming
 language all of the sudden like you need to in Java. In Java you have to
 write the build specification in XML which isn’t designed to support
 programming logic.

 Node.js is really fast! The data comes in and the answers come out like lightning.
 Node.js doesn't mess around with setting up separate threads with all of
 the locking headaches. There's no overhead to slow down anything. You
 write simple code and Node.js takes the right step as quickly as possible.

 Javascript is the most popular programming language at the moment.
 This means that a lot of people have knowledge about it, and (among other things)
 companies will not need a specialist to maintain a system.


 CONS
 _____________________________________________________________________
 Java has around 20 years of experience as a serverside language.
 It has glitches and bugs, but all in all it’s more safe to use
 than JavaScript because the Java Virtual Machine is tested through
 endless of regression tests by the Sun/Oracle company.

 Depending on what kind of backend you’re creating, JavaScript lacks
 when it comes to the utility classes - sure a lot more plugins alike are on their way,
 but the developers at Sun/Oracle have invested a great deal in complex packages
 for more scientific work with its strong mathematical foundation; there are BigIntegers,
 elaborate IO routines, and complex Date codes.

 You easily get confused with JavaScript where functions
 which do not have any answers give three different
 results; undefined, NaN, and null.

 JavaScript may provide you with fast code, but this is only the reality if written correct.
 Java's Web servers are multi-threaded. Creating multiple threads may take time and memory,
 but it pays off. If one thread deadlocks, the others continue. If one thread requires
 longer computation, the other threads aren’t starved for attention (usually).
 If one Node.js request runs too slowly, everything slows down.
 There's only one thread in Node.js, and it will get to your event when it's good and
 ready. It may look superfast, but underneath it uses the same architecture as a one-
 window post office in the week before Christmas, however it is possible to use
 the advantage of multicore systems with Node.js, but it's a bit more complicated to implement
 than with Java.

 */
//
//————————————————————————————————————————————————————————————————
//	3 - Explain strategies to implement a Node.js based server architecture that still could
//	take advantage of a multi-core server.
//————————————————————————————————————————————————————————————————
//
/*

 http://mobilenext.net/scaling-node-js-multi-core-systems/

 To take advantage of more than a single core in a multi-core system, engineers have two main choices.
 The first choice is to let resource allocation happen at the system level wherein incoming requests
 are distributed to multiple single-threaded Node.js processes each running in a virtual machine assigned
 a single core from the multi-core processor. All the instances live behind a proxy which serves to balance
 incoming requests to available Node processes.
 This choice is a fine one and works nicely as long as the costs of virtualization are considered acceptable.
 However, the Node community has come forward with an even better second solution which bakes in multi-core
 awareness and capability natively into the Node.js platform.
 This second choice is the use of a module that enables “clustering” Node.js which runs as many dedicated
 single threaded processes under a master Node.js process without the need for elaborate virtual machine infrastructure.
 This results in significant performance gains without the costs associated with virtualization and is described next.

 */
//
//————————————————————————————————————————————————————————————————
//	4 - Explain, using relevant examples, concepts related to the testing a REST-API using
//	Node/JavaScript + relevant packages
//————————————————————————————————————————————————————————————————
//
/*
 */
//
//————————————————————————————————————————————————————————————————
//	5 - Explain, using relevant examples, the Express concept; Middleware
//————————————————————————————————————————————————————————————————
//
/*
 Middleware functions are functions that have access to the request object (req), the response object (res),
 and the next middleware function in the application’s request-response cycle. The next middleware function is
 commonly denoted by a variable named next. If the current middleware function does not end the request-response
 cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be
 left hanging.
 An Express application can use the following types of middleware:
 - Application-level middleware
 - Router-level middleware
 - Error-handling middleware (NOT EXPLAINED)
 - Built-in middleware       (NOT EXPLAINED)
 - Third-party middleware

 ABOUT THE 'NEXT()'
 next() call inside a middleware invokes the next middleware or route handler depending
 on whichever is declared next. But next() call inside a route handler invokes the next
 route handler only. If there is a middleware next then it’s skipped. Therefore middlewares
 must be declared above all route handlers.
 */

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
//————————————————————————————————————————————————————————————————
//	6 - Explain, using relevant examples, how to implement sessions,
//	and the legal implications of doing this
//————————————————————————————————————————————————————————————————
//
/*

 https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions/

 When a user first logs in or registers for your site, you know who they are because
 they just submitted their information to your server. You can use that information to create
 a new record in your database or retrieve an existing one - simple!
 But how do you keep them authenticated when they do something crazy like reload the page?
 Magic, that’s how! Also known as sessions...
 That being said, a ‘session’ is a squishy, abstract term for keeping users logged in.
 We care more about the actual mechanism for persisting authentication; namely, cookies.
 The most delicious part of user management:
 Cookies allow you to store a user’s information inside a file on the their browser.
 The browser then sends that info back on every request, allowing your application to identify
 the user and customize their experience. Which is objectively way better than asking for a
 username and password on every request.

 */
//----------The real basic setup for a session:--------------
var express = require('express');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
//...

//How to access the session object through the request:
app.get('/awesome', function(req, res) {
    if(req.session.lastPage) {
        res.write('Last page was: ' + req.session.lastPage + '. ');
    }

    req.session.lastPage = '/awesome';
    res.send('Your Awesome.');
});
//-----------------------------------------------------------
//Another way of dealing with sessions:
//Import library to your app
var session = require('client-sessions');

//Next, add session handler middleware to your app.js file and set these basic configuration options:
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
/*
 1 - The secret is a random, high-entropy string you create to encrypt the cookie. We need to take this
 step because the browser is an inherently untrusted environment; anyone with access can open
 it up and see what’s stored in there. Client-sessions will encrypt and decrypt all the cookie
 values so you don’t have to worry about prying eyes. This is a big part of why we recommend using
 a library to manage sessions. It’s never a good idea to roll your own crypto and unencrypted
 cookies are a non-starter.

 2 - The duration defines how long the session will live in milliseconds. After that, the cookie is
 invalidated and will need to be set again. You probably experience this behavior daily on sites
 that deal with secure data. Your banking portal, for instance (hopefully).

 3 - Finally, activeDuration allows users to lengthen their session by interacting with the site.
 If the session is 28 minutes old and the user sends another request, activeDuration will extend the
 session’s life for however long you define. In this case, 5 minutes. In short, activeDuration
 prevents the app from logging a user out while they’re still using the site.
 */
//To successfully use the cookie via a route:
app.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
            res.render('login.jade', { error: 'Invalid email or password.' });
        } else {
            if (req.body.password === user.password) {
                // sets a cookie with the user's info
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                res.render('login.jade', { error: 'Invalid email or password.' });
            }
        }
    });
});

//There are a few more steps to properly secure the session. The first is simply to make sure
//your app resets the session when a user logs out. Something like this would do the trick:
app.get('/logout', function(req, res) {
    req.session.reset();
    res.redirect('/');
});

/*
 Next, make sure to use SSL so your application only communicates with the browser over
 an encrypted channel. With SSL in place, there are a few additional security options to set on client-sessions:
 1. 'httpOnly' prevents browser JavaScript from accessing cookies.
 2. 'secure' ensures cookies are only used over HTTPS
 3. 'ephemeral' deletes the cookie when the browser is closed. Ephemeral cookies are particularly important
 if you your app lends itself to use on public computers.
 */
//To recap, here’s the updated configuration:
app.use(session({
    cookieName: 'session',
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));
//
//———————————————————————————————————————————————————————————————
//	7 - Compare the express strategy toward (server side) templating with the one
//	you used with Java on 2nd semester
//———————————————————————————————————————————————————————————————
//
/*
 */
//
//———————————————————————————————————————————————————————————————
//	8 - Explain, using relevant examples, your strategy for implementing a REST-API with
//	Node/Express and show how you can “test” all the four CRUD operations programmatically
//	using for example the Request package
//———————————————————————————————————————————————————————————————
//
/*
 */
//
//———————————————————————————————————————————————————————————————
//	9 - Explain, using relevant examples, about testing JavaScript code, relevant packages
//	(Mocha etc.) and how to test asynchronous code
//———————————————————————————————————————————————————————————————
//
/*
 Testing in JavaScript is really easy.
 */
//the package.json file (for review):
//{ 
//    "name": "testing", 
//    "version": "1.0.0", 
//    "description": "", 
//    "main": "index.js", 
//    "scripts": { 
//    "test": "mocha" 
//    }, 
//    "author": "", 
//    "license": "ISC", 
//    "devDependencies": { 
//    "chai": "^3.5.0", 
//        "mocha": "^2.4.5" 
//    }
// }

//the module to test:

function add(n1, n2) {
    return n1 + n2;
}

function addAsync(n1, n2, callback) {
    setTimeout(function () {
        var result = n1 + n2;
        console.log("In timer function");
        callback(result);
    }, 1000);
}

module.exports.add = add;
module.exports.addAsync = addAsync;

//The actual test

var expect = require("chai").expect;
var adder = require("../module");
describe("Test Calculator", function(){
    it("should return 4", function(){
        expect(adder.add(2,2)).to.be.equal(4);
    })

    it("Should return 420 asynchronously", function(done){
        adder.addAsync(400, 20, function(res){
            expect(res).to.be.equal(420);
            done();
        })
    })
});
//
//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//	10 - Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.
//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
//
/*
 */