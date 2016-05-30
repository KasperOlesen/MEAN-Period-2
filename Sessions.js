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
    res.send('You are Awesome.');
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
