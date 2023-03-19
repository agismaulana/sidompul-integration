const sqlite = require('sqlite3')

let db = new sqlite.Database(
    './sidompul.db', 
    sqlite.OPEN_READWRITE, 
    (err) => {
        if (err && err.code == "SQLITE_CANTOPEN") {
            createDatabase();
            return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
    }
);

const createDatabase = () => {
    let db = new sqlite.Database('sidompul.db', (err) => {
        console.log(err)
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(db)
    })
    console.log(db)
}

const createTables = (db) => {
    // execute for create table or something to database sqlite
    db.exec(`
        create table users (
            id INTEGER not null PRIMARY KEY,
            client_id varchar(150) not null,
            client_secret varchat(150) not null,
            app_id varchar(150) null,
            app_key varchar(150) null,
            name varchar(50) null,
            role varchar(50) null
        );

        insert into users values (
            ${Math.floor(Math.random() * 1000)},
            "admin", 
            "aoeliyaAdmin123",
            "-",
            "-",
            "Admin Aoeliya",
            "admin"
        );
    `)
}

module.exports = db;