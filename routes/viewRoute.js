const {
    historyTransaction,
    xwgHistoryTransaction,
    awgHistoryTransaction,
    listProduct
} = require('../controller/ViewController') 

module.exports = (app, route) => {
    route.get('/index', historyTransaction)
    route.get('/awg-index', awgHistoryTransaction)
    route.get('/xwg-index', xwgHistoryTransaction)
    route.get('/list-product', listProduct)
    app.use('/', route)
}