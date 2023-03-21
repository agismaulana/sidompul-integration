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
        path['get-token'](req, res, next)
        return;
    }
    
    const managePin = (req, res, next) => {
        path['encrypted-pin'](req, res, next)
        return;
    }

    const middlewareSession = async (req, res, next) => {
        await manageAuthorization(req, res)
        if(req.body.pin) {
            setTimeout(() => {
                managePin(req, res);
            }, 3200)
        }
        setTimeout(() => {
            return next();
        }, 5200)

    }

    router.post('/', (req, res) => {
        return path[req.body.path](req, res)
    })
    app.use('/apitrx', middlewareSession, router)
}