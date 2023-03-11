const fetch = require('node-fetch-commonjs')
const dotenv = require('dotenv')

dotenv.config()
const { APP_HOST, CLIENT_ID, CLIENT_SECRET } = process.env

const {
    getToken
} = require('../controller/SidompulController.js')

module.exports = (app, router) => {
    const path = {
        'get-token': getToken
    }

    const manageAuthorization = (req, res, next) => {
        return path['get-token'](req, res, next)
    }

    const managePin = (req, res) => {
        return path['encrypted-pin'](req, res, next)
    }

    const middlewareSession = async(req, res) => {
        if(req.query.pin) {
            await manageAuthorization(req, res) 
            await managePin(req, res)
        } else {
            await manageAuthorization(req, res) 
        }
        next()
    }

    router.post('/', (req, res) => {
        return path[req.body.path](req, res)
    })
    app.use('/apitrx', middlewareSession, router)
}