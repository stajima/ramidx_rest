const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passportService = require('./config/passport');
const passport = require('passport');

const app = express();

/**
 * Middleware 
 */
app.use(logger('dev')); // Log requests to API using morgan
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * Use Gulp set port. Use port 3000 as backup.
 */
const port = process.env.port || 3000;

/*
 * Send Welcome string if root url is requested.
 */
app.get('/', function (req, res) {
    res.send('Welcome');
});

/*
 * Require and use the agentRouter if path requested is /api/Agents.
 */
const agentRouter = require('./routes/agentRoutes')();
app.use('/api/agents', agentRouter);

/**
 * Route for /api/authentication
 */
const authenticationRouter = require('./routes/authenticationRoutes')();
app.use('/api/auth', authenticationRouter);

/*
 * Start express server.
 */
app.listen(port, function () {
    console.log('Gulp is running on port ' + port);
}); 