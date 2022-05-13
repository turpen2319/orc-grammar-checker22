const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config(); //we need this to access environmental variable in our projects
require('./config/database');
//creating an instance of express called 'app'
const app = express();

//mount middleware
app.use(logger('dev'));
app.use(express.json({limit: '15mb'}));
//we don't need express.urlencoded() cause that's used to 
//process data submitted by a form, and we don't submit forms in a SPA

// Config both serve-favicon and static middleware to serve
//from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/images', require('./routes/api/images'))

// The following "catch all" route (note the *) is necessary to return the index.html on all non-AJAX requests
// Now the "catch all" route will serve the index.html whenever:
//    A user types a path into the address bar and presses enter.
//    The user refreshes the browser.
//    An "external" link in an email, included on another web page, etc. to the MERN-Stack app is clicked.

// For example, if we slack the following link to a friend: https://sei-cafe.herokuapp.com/orders/new. The friend clicks on it, initiating an HTTP request to our server.
// However, the /orders/new part of the URL is supposed to be for the client router - not the server! But there it is, and the server has to deal with it...
// The server deals with it by, thanks to the "catch all" route, sending back index.html - which is what we want.
// After index.html loads in the browser, the React app's client-side routing will render components based upon the /orders/new path in the address bar.
app.get('/*', function(req, res) { //this serves the root html from the build folder
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})




const port = process.env.PORT || 3001;
app.listen(port, function() {
    console.log(`Express app runnning on port ${port}`)
});