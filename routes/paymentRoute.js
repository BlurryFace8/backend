const express = require('express')
const { processPayment, sendStripeKey}=require('../controller/paymentController')
const router= express.Router()

router.get('/getStripeKey',sendStripeKey)
router.post('/processPayment',processPayment)

module.exports = router