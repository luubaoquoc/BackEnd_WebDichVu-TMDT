const UserRouter = require('./UserRouter');
const OrderServiceRouter = require('./OrderServiceRouter');
const ProductRouter = require('./ProductRouter');

const routes = (app) => {

    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter)
    app.use('/api/service', OrderServiceRouter);
}

module.exports = routes;