const mongoose = require('mongoose')
const{ObjectId}= mongoose.Schema

const orderSchema = new mongoose.Schema({
    orderItems:[{
        type:ObjectId,
        ref:"OrderItems",
        required:true
    }],
    user:{
        type:ObjectId,
        ref:"User",
        requied:true
    },
    shipping_address:{
        type: String,
        require:true
    },
    alternative_shipping_address:{
        type:String
    },
    city:{
        type:String,
        require:true
    },
    zipcode:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:"Pending",
        require:true
    },
    total_price:{
        type:Number,
        require:true
    },

},{timestamps:true})

module.exports = mongoose.model("Order",orderSchema)