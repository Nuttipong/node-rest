const express = require('express');
const app = express();
const apiRouter = require('./controllers');

// setup the app middleware
require('./middleware/appMiddleware')(app);

// setup database
require('./repository/dao');

// setup the api
const router = apiRouter.createRoute();
app.use('/api', router);

// export the app for testing
module.exports = app;