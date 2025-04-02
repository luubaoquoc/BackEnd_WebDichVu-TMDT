const UserRouter = require('./UserRouter');
const OrderServiceRouter = require('./OrderServiceRouter');

const routes = (app) => { 

    app.use('/api/user', UserRouter);
    app.use('/api/service', OrderServiceRouter);
 }

module.exports = routes;