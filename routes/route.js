const fetch = require('node-fetch-commonjs')
const dotenv = require('dotenv')

dotenv.config()
const { APP_HOST, CLIENT_ID, CLIENT_SECRET } = process.env

const {
    getPulsaBalance,
    getDompulBalance,
    getAWGStock,
    getXWGStock,
    getToken,
    postAWGTembak,
    postAWGTransactionInfoDetail,
    postPackage,
    postW2P,
    postXWGTembak,
    postXWGTransactionInfoDetail,
    encryptedPin,    
    getProductList,
    transactionHistory,
    transactionHistoryDetail,
    getAWGTransactionInfo,
    getXWGTransactionInfo,
    postPackagePulsa
} = require('../controller/SidompulController.js')

module.exports = (app, router) => {
    const path = {
        'get-token': getToken,
        'get-pulsa-balance': getPulsaBalance,
        'get-dompul-balance': getDompulBalance,
        'get-awg-stock': getAWGStock,
        'get-xwg-stock': getXWGStock,
        'get-product-list': getProductList,
        'get-transaction-history': transactionHistory,  
        'get-transaction-history-detail': transactionHistoryDetail,  
        'get-awg-transaction-info': getAWGTransactionInfo,  
        'get-xwg-transaction-info': getXWGTransactionInfo,  
        'encrypted-pin': encryptedPin,
        'post-awg-tembak': postAWGTembak,
        'post-awg-transaction-info-detail': postAWGTransactionInfoDetail,
        'post-xwg-tembak': postXWGTembak,
        'post-xwg-transaction-info-detail': postXWGTransactionInfoDetail,
        'post-package': postPackage,
        'post-package-deduct-pulsa': postPackagePulsa,
        'post-w2p': postW2P
    }

    const manageAuthorization = (req, res, next) => {
        return path['get-token'](req, res, next)
    }

    const managePin = (req, res) => {
        return path['encrypted-pin'](req, res, next)
    }

    const middlewareSession = async(req, res, next) => {
        if(req.query.pin) {
            await manageAuthorization(req, res, next) 
            await managePin(req, res, next)
            return;
        } else {
            await manageAuthorization(req, res, next) 
            return;
        }
        next()
    }

    router.post('/', (req, res) => {
        return path[req.query.path](req, res)
    })
    app.use('/apitrx', middlewareSession, router)
}