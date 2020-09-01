const braintree = require('braintree')
const User = require('../models/user')
const { response } = require('express')
require('dotenv').config()

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
})
exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, response){
        if(err){
            res.status(500).send(err)
        }
        else
        {
            res.send(response)
        }
    })
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    // charge the user

    let newTransaction = gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if(err){
            res.status(500).json(err)
        }
        else {
            res.json(result)
        }
    })
}
