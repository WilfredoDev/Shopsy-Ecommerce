const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const orderRouter  =require('./order.router');
const express = require('express');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', authRouter);
    router.use('/user', userRouter);
    router.use('/categories', categoriesRouter);
    router.use('/products', productsRouter);
    router.use('/orders', orderRouter);
};

module.exports = routerApi;