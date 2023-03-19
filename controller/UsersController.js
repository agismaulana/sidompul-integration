const db = require("../config/config");

exports.index = async (req, res) => {
    db.serialize(() => {
        db.all(
            `select * from users where role != 'admin'`,
            (err, rows) => {
                return res.render('users/index', {
                    'title': 'Manajemen User',
                    'users': rows,
                    'loggedIn': true,
                    'admin': req.session.role ?? false
                });
            }  
        )
    })
}

exports.create = (req, res) => {
    return res.render('users/create', {
        'title': 'Tambah User',
        'loggedIn': true,
        'admin': req.session.role ?? false
    });
}

exports.store = (req, res) => {
    const {
        app_id,
        app_key,
        client_id,
        client_secret,
        name
    } = req.body
    db.serialize(() => {
        db.run(
            `INSERT INTO users VALUES (
                ${Math.floor(Math.random() * 1000)},
                '${client_id}',
                '${client_secret}',
                '${app_id}',
                '${app_key}',
                '${name}',
                'user'
            )`,
            (err) => {
                if(err)
                    console.log(err)
                    return res.redirect('/users')

                return res.redirect('/users');
            }
        )
    })
    return;
}

exports.show = (req, res) => {
    db.serialize(() => {
        db.get(
            `SELECT * FROM users WHERE id = ${req.param.id}`,
            (err, row) => {
                if(err)
                    return res.status(500).json({
                        'data': {},
                        'message': "Detail failed successfully"
                    })

                return res.json({
                    'data': row,
                    'message': "Detail successfully"
                })
            }
        )
    })
}

exports.edit = (req, res) => {
    db.serialize(() => {
        db.get(
            `SELECT * FROM users WHERE id=${req.params.id}`,
            (err, row) => {
                console.log(row)
                return res.render('users/create', {
                    'title': 'Tambah User',
                    'user': row,
                    'loggedIn': true,
                    'admin': req.session.role ?? false
                });
            }
        )
    })
    return;
}

exports.update = (req, res) => {
    const {
        app_id,
        app_key,
        client_id,
        client_secret,
        name
    } = req.body
    db.serialize(() => {
        db.run(
            `UPDATE users SET 
                app_id="${app_id}",
                app_key="${app_key}",
                client_id="${client_id}",
                client_secret="${client_secret}",
                name="${name}"
            WHERE id="${req.params.id}"    
            `,
            (err) => {
                if(err)
                    return res.redirect('/users')

                return res.redirect('/users');
            }
        )
    })
    return;
}

exports.destroy = (req, res) => {
    db.serialize(() => {
        db.run(
            `DELETE FROM users WHERE id = ${req.params.id}`,
            (err) => {
                if(err)
                    return res.redirect('/users')

                return res.redirect('/users')
            }
        )
    })
    return;
}