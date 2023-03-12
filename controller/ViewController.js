exports.historyTransaction = (req, res) => {
    res.render('index', {
        'title': 'History Transaction'
    })
}
exports.awgHistoryTransaction = (req, res) => {
    res.render('awgIndex', {
        'title': 'AWG History Transaction'
    })
}
exports.xwgHistoryTransaction = (req, res) => {
    res.render('xwgIndex', {
        'title': 'XWG History Transaction'
    })
}
exports.listProduct = (req, res) => {
    res.render('listProduct', {
        'title': 'List Product'
    })
}