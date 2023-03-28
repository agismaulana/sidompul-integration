const { index, store, show, update, destroy, create, edit } = require('../controller/UsersController');
const {
    historyTransaction,
    xwgHistoryTransaction,
    awgHistoryTransaction,
    listProduct,
    listCommand,
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

    route.get('/users', index);
    route.get('/users/create', create);
    route.post('/users', store);
    route.get('/users/:id', edit);
    route.get('/users/:id/detail', show);
    route.post('/users/:id', update);
    route.get('/users/:id/delete', destroy);
    
    route.get('/index', historyTransaction)
    route.get('/awg-index', awgHistoryTransaction)
    route.get('/xwg-index', xwgHistoryTransaction)
    route.get('/list-product', listProduct)
    route.get('/list-command', listCommand)
    app.use('/', route)
}