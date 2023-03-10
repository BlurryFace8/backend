const { array } = require('../utils/fileUpload')
const {check, validationResult}= require('express-validator')

exports.categoryCheck = [
    check('category_name','category name is required').notEmpty()
    .isLength({min:3}).withMessage("Category name must be atleast 3 characters")
]

exports.validate = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next()
}

exports.productCheck = [
    check('product_name','Product name is required.').notEmpty()
    .isLength({min:3}).withMessage("Product name must contain atleast 3 characters."),

    check('product_price','Price is required').notEmpty()
    .isNumeric().withMessage("Price must be a number"),

    check('product_description','Description is required.').notEmpty()
    .isLength({min:20}).withMessage("Description must be atleast 20 characters"),
    
    check('category','category is required').notEmpty(),

     check('count_in_stock','Count in stock is required').notEmpty()
     .isNumeric().withMessage("Count must be a number")

]

exports.userCheck = [
    check('username','username is required.').notEmpty()
    .isLength({min:3}).withMessage("Username must be atleast 3 characters"),
    check('email',"Email is required").notEmpty()
    .isEmail().withMessage("Email format incorrect."),
    check('password','password is required').notEmpty()
    .isLength({min:8}).withMessage("Password must be at least 8 character.")
    .not().isIn(['asd1234','password','12345678']).withMessage("Password cannot use common words")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase character.")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase character.")
    .matches(/[0-9]/).withMessage("Password must contain at least one numeric character.")
   .not().matches(/[\\;:.,]/).withMessage("\ . , :and; are not allowed in password")

]