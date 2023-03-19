const express = require('express')
const session = require('express-session')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const http = require('http')
const path = require('path')

const router = express.Router()
dotenv.config()

const db = require('./config/config');

const { PORT, HOST } = process.env;
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(
  session({
    secret: 'aoeliya',
    saveUninitialized: false,
    resave: false
  })
);


require('./routes/route')(app, router);
require('./routes/viewRoute')(app, router);

app.use(morgan('dev'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'src')))

http.createServer(app).listen(PORT, HOST, () => {
    console.log(`App run on host ${HOST} on ${PORT}`);
});