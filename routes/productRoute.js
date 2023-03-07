const express = require('express')
const { addProduct, getAllProduct, updateProduct, productsByCategory, productDetails, deleteProduct, getFilteredProduct } = require('../controller/productController')
const { requireSignin } = require('../controller/userController')

const upload = require('../utils/fileUpload')
const { productCheck, validate } = require('../Validation')
const router = express.Router()

router.post ('/addProduct',upload.single('product_image'),requireSignin, productCheck, validate, addProduct)
router.get('/getallproducts',getAllProduct)
router.put('/updateproduct/:id',requireSignin,updateProduct)
router.get('/productsbycategory/:category_id',productsByCategory)
router.get('/productdetails/:id',productDetails)
router.put('/updateproduct/:id',upload.single('product_image'),requireSignin,updateProduct)
router.delete('/deleteproduct/:id',requireSignin,deleteProduct)
router.post('/getfilteredproducts',getFilteredProduct)
module.exports = router