const express = require('express')
const { placeorder, getAllOrder, getOrderDetalis } = require('../controller/orderController')
const router = express.Router()

router.post(`/placeorder`,placeorder)
router.get(`/orderlist`,getAllOrder)
router.get(`/orderdetails/:id`,getOrderDetalis)

module.exports = router