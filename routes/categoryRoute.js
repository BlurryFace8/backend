const express = require('express')
const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controller/categoryController')
const { requireSignin } = require('../controller/userController')
const {categoryCheck,validate } = require('../Validation')
const router = express.Router()

router.post('/addcategory',requireSignin, categoryCheck, validate, addCategory)
router.get('/getallcategories', getAllCategories)
router.get('/categorydetails/:id', getCategoryDetails)
router.put('/updatecategory/:id',requireSignin,updateCategory)
router.delete('/deletecategory/:id',requireSignin,deleteCategory)

module.exports = router