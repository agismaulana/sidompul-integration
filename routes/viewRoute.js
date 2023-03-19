const { index, store, show, update, destroy, create, edit } = require('../controller/UsersController');
const {
    historyTransaction,
    xwgHistoryTransaction,
    awgHistoryTransaction,
    listProduct,
    login,
    signedIn
} = require('../controller/ViewController') 



module.exports = (app, route) => {
    const adminMiddlewareLogin = (req, res, next) => {
        if(!req.session.token) {
            return res.redirect('/login');
        }

        if(req.session.token && req.session.role == 'user') {
            return req.redirect('/index');
        }
        next()
    }

    const middlewareLogin = (req, res, next) => {
        if(!req.session.token) {
            return res.redirect('/login');
        }

        if(req.session.token && req.session.role == 'admin') {
            return req.redirect('/users');
        }

        next();
    }

    const isLoggedIn = (req, res, next) => {        
        if(req.session.token) {
            return res.redirect('/index');
        }
        next();
    }

    route.get('/login', isLoggedIn, login)
    route.get('/logout', (req, res) => {
        if(req.session.token) {
            req.session.destroy();
        }

        return res.redirect('/login');
    })
    route.post('/sign', isLoggedIn, signedIn)

    route.get('/users', adminMiddlewareLogin, index);
    route.get('/users/create', adminMiddlewareLogin, create);
    route.post('/users', adminMiddlewareLogin, store);
    route.get('/users/:id', adminMiddlewareLogin, edit);
    route.get('/users/:id/detail', adminMiddlewareLogin, show);
    route.post('/users/:id', adminMiddlewareLogin, update);
    route.get('/users/:id/delete', adminMiddlewareLogin, destroy);
    
    route.get('/index', middlewareLogin, historyTransaction)
    route.get('/awg-index', middlewareLogin, awgHistoryTransaction)
    route.get('/xwg-index', middlewareLogin, xwgHistoryTransaction)
    route.get('/list-product', middlewareLogin, listProduct)
    app.use('/', route)
}