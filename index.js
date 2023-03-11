const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const http = require('http')

const router = express.Router()
dotenv.config()

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


  require('./routes/route')(app, router);

http.createServer(app).listen(PORT, HOST, () => {
    console.log(`App run on host ${HOST} on ${PORT}`);
});