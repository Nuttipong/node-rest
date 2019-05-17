import express from 'express';
import StoreController from './store/storeController';

export default class Router {
    constructor () {
        // create app router
        this.routes = express.Router();
        
        // create all controller
        this.storeController = new StoreController();

        // map routes
        this.routes.use('/store', this.storeController.router);
    }
}





