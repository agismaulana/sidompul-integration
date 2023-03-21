const fetch = require('node-fetch-commonjs');
const dotenv = require('dotenv')

dotenv.config()
const { SIDOMPUL_URL } = process.env;

// Authorization get Token
exports.getToken = (req, res) => {
    const uri = `${SIDOMPUL_URL}token`
    const {
        clientId,
        clientSecret
    } = req.body;

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const body = new URLSearchParams();
    body.append('client_id', clientId);
    body.append('client_secret', clientSecret);
    body.append('grant_type', 'client_credentials');

    let code = null;
    let get = fetch(uri, {
        headers,
        method: 'POST',
        body,
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        if(code !== 200) 
            return res.status(code).json(result)
        req.session.authorization = result.access_token
        return;
    })
    .catch(err => {
         err.json().then(body => {
            return body;
        })
    })
}

// encrypted Pin
exports.encryptedPin = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/post-encrypt`
    const {
        apiId,
        apiKey,
        pin
    } = req.body

    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'language': 'ID',
        'Content-Type': 'application/json'         
    }

    const body = {
        'data': pin
    }

    let code = null;
    fetch(uri, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then((result) => {
        req.session.pin = result.result.data
        return;
    })
    .catch(err => {
        err.json().then(body => {
            return body;
        })
    })
}

// GET Pulsa Balance
exports.getPulsaBalance = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-pulsa-balance`

    const {
        apiId,
        apiKey
    } = req.body

    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID'
    }

    fetch(uri, {
        headers,
        method: 'GET'
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// GET Dompul Balance
exports.getDompulBalance = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-dompul-balance`

    const {
        apiId,
        apiKey
    } = req.body

    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID'
    }

    fetch(uri, {
        headers,
        method: 'GET'
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// POST Purchase Packge
exports.postPackage = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/post-package`
    const {
        apiId,
        apiKey,
        msisdn,
        pin,
        productCode
    } = req.body
    
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID'
    }

    const body = {
        msisdn,
        pin,
        productCode
    }

    fetch(uri, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// POST Purchase Package Deduct Pulsa
exports.postPackagePulsa = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/post-package-pulsa`
    const {
        apiId,
        apiKey,
        msisdn,
        pin,
        productCode
    } = req.body
    
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID'
    }

    const body = {
        msisdn,
        pin,
        productCode
    }

    fetch(uri, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// POST Reload w2p
exports.postW2P = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/post-w2p`
    const {
        apiId,
        apiKey,
        msisdn,
        pin,
        denom
    } = req.body
    
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID'
    }

    const body = {
        msisdn,
        pin: req.session.pin,
        denom
    }

    fetch(uri, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// GET AWG Stock
exports.getAWGStock = (req, res) => {
    const {
        type,
        apiId,
        apiKey
    } = req.body
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-awg-stock${type ? `?roType=${type}` : "" }`

    const headers = {
        'Authorization': 'Bearer '+req.session.authorization,
        'apiid': apiId,
        'apikey': apiKey,
        'language': 'ID',
        'Content-Type': 'application/json'
    }

    let code;
    fetch(uri, {
        headers,
        method: 'GET'
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// POST AWG Tembak
exports.postAWGTembak = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/post-awg-tembak`
    const {
        apiId,
        apiKey,
        target,
        vid,
        command,
        type
    } = req.body
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID',
    }

    const body = { 
        "target": [target],
        "pin": req.session.pin,
        "vid": vid,
        "command": command,
        "allowType": type
    }

    fetch(uri, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// POST AWG Transaction Info Detail
exports.postAWGTransactionInfoDetail = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/post-awg-transaction-info-detail`
    const {
        apiId,
        apiKey,
        command, 
        transactionId,
    } = req.body

    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID' 
    }

    const body = {
        command,
        masterTrxId: transactionId
    }

    let code;
    fetch(uri, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// GET XWG Stock
exports.getXWGStock = (req, res) => {
    const {
        type,
        apiId,
        apiKey
    } = req.body
 
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-xwg-stock${type ? `?roType=${type}` : "" }`
    
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID'
    }

    let code;
    fetch(uri, {
        method: 'GET',
        headers,
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// POST XWG Tembak
exports.postXWGTembak = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/post-xwg-tembak`
    const {
        apiId,
        apiKey,
        target,
        vid,
        type,
        command
    } = req.body
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID',
    }

    const body = { 
        "target": [target],
        "pin": req.session.pin,
        "vid": vid,
        "allowType": type,
        "command": command
    }

    fetch(uri, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// POST XWG Transaction Info Detail
exports.postXWGTransactionInfoDetail = (req, res) => {
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/post-xwg-transaction-info-detail`
    const {
        apiId,
        apiKey,
        command, 
        transactionId,
    } = req.body

    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
        'language': 'ID' 
    }

    const body = {
        command,
        masterTrxId: transactionId
    }

    let code;
    fetch(uri, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// GET Product List
exports.getProductList = (req, res) => {
    const {
        apiId,
        apiKey
    } = req.body
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-product-list`
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
    }

    let code;
    fetch(uri, {
        headers,
        method: 'GET'
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// Get Transaction History
exports.transactionHistory = (req, res) => {
    const {
        startDate,
        endDate,
        apiId,
        apiKey
    } = req.body
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-transaction-history?startdate=${startDate}&enddate=${endDate}`
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
    }

    let code;
    fetch(uri, {
        headers,
        method: 'GET'
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// Get Transaction History Detail
exports.transactionHistoryDetail = (req, res) => {
    const {
        transactionId,
        msisdn,
        orderStatus,
        apiId,
        apiKey
    } = req.body
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-transaction-history-detail?transactionId=${transactionId}&msisdnB=${msisdn}&orderStatus=${orderStatus}`
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
    }

    let code;
    fetch(uri, {
        headers,
        method: 'GET'
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// GET AWG Transaction info
exports.getAWGTransactionInfo = (req, res) => {
    const {
        apiId,
        apiKey,
        beginDate,
        endDate,
        type
    } = req.body
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-awg-transaction-info?beginDate=${beginDate}&endDate=${endDate}&servicetype=${type}`
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
    }

    let code;
    fetch(uri, {
        headers,
        method: 'GET'
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        console.log(result)
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}

// GET XWG Transaction info
exports.getXWGTransactionInfo = (req, res) => {
    const {
        apiId,
        apiKey,
        beginDate,
        endDate,
        type
    } = req.body
    const uri = `${SIDOMPUL_URL}sidompul/openapi/v1/get-xwg-transaction-info?beginDate=${beginDate}&endDate=${endDate}&servicetype=${type}`
    const headers = {
        'Authorization': `Bearer ${req.session.authorization}`,
        'apiid': apiId,
        'apikey': apiKey,
        'Content-Type': 'application/json',
    }

    let code;
    fetch(uri, {
        headers,
        method: 'GET'
    })
    .then(response => {
        code = response.status
        if(!response.ok) { throw response }
        return response.json()
    })
    .then(result => {
        return res.status(code).json(result)
    })
    .catch(err => {
        err.json().then((body) => {
            return res.status(body.statusCode).json(body.result)
        })
    })
}