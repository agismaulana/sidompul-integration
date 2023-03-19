const db = require('./../config/config');
const cryptoJS = require('crypto-js');

exports.historyTransaction = async (req, res) => {
    db.serialize(() => {
        db.get(
           `SELECT * FROM users where id = '${req.session.user_id}'`,
           (err, row) => {
                if(err) {
                    return res.render('index', {
                        'title': 'History Transaction',
                        'user': {},
                        'loggedIn': true,
                        'admin': req.session.admin ?? null
                    });
                }
                return res.render('index', {
                    'title': 'History Transaction',
                    'user': row,
                    'loggedIn': true,
                    'admin': req.session.admin ?? null
                });
           } 
        )
    })
}
exports.awgHistoryTransaction = (req, res) => {
    db.serialize(() => {
        db.get(
           `SELECT * FROM users where id = '${req.session.user_id}'`,
           (err, row) => {
                if(err) {
                    return res.render('awgIndex', {
                        'title': 'AWG History Transaction',
                        'user': {},
                        'loggedIn': true,
                        'admin': req.session.admin ?? null
                    });
                }
                return res.render('awgIndex', {
                    'title': 'AWG History Transaction',
                    'user': row,
                    'loggedIn': true,
                    'admin': req.session.admin ?? null
                });
           } 
        )
    })
}
exports.xwgHistoryTransaction = (req, res) => {
    db.serialize(() => {
        db.get(
           `SELECT * FROM users where id = '${req.session.user_id}'`,
           (err, row) => {
                if(err) {
                    return res.render('xwgIndex', {
                        'title': 'XWG History Transaction',
                        'user': {},
                        'loggedIn': true,
                        'admin': req.session.admin ?? null
                    });
                }
                return res.render('xwgIndex', {
                    'title': 'XWG History Transaction',
                    'user': row,
                    'loggedIn': true,
                    'admin': req.session.admin ?? null
                });
           } 
        )
    })
}
exports.listProduct = (req, res) => {
    db.serialize(() => {
        db.get(
           `SELECT * FROM users where id = '${req.session.user_id}'`,
           (err, row) => {
                if(err) {
                    return res.render('listProduct', {
                        'title': 'List Product',
                        'user': {},
                        'loggedIn': true,
                        'admin': req.session.admin ?? null
                    });
                }
                return res.render('listProduct', {
                    'title': 'List Product',
                    'user': row,
                    'loggedIn': true,
                    'admin': req.session.admin ?? null
                });
           } 
        )
    })
}

exports.login = (req, res) => {
    res.render('login', {
        'title': 'Login Page',
        'loggedIn': false
    })
}

exports.signedIn = (req, res) => { 
    db.get(
       `SELECT * FROM users WHERE client_id ="${req.body.client_id}" AND client_secret = "${req.body.client_secret}"`,
       (err, row) => {
            if(err) {
                return res.redirect('/login');
            } 
            if(row) {
                req.session.token = cryptoJS.SHA256(row.id).toString(cryptoJS.enc.Base64);
                req.session.user_id = row.id;
                req.session.role = row.role;
                if(row.role == 'admin') {
                    return res.redirect('/users');
                }
                return res.redirect('/index');
            }
            return res.redirect('/login');
       } 
    )
    return;
}