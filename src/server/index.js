import express from 'express';
import AppAdo from '../repository/dao';

// setup db
const dao = new AppAdo();
dao.seedDatabase();

import Router from '../controllers';

const app = express();
const router = new Router();

// setup the app middleware
require('../middleware/appMiddleware')(app);

// map the routes
app.use('/api', router.routes);

// export the app for testing
module.exports = app;
