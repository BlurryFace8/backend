const mongoose = require('mongoose')
const{ObjectId}= mongoose.Schema

const OrderItemSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"product",
        required:true

    },
    quantity:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("OrderItems",OrderItemSchema)