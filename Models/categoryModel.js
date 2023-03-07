const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category_name:{
        type:"string",
        require: true,
        trim: true
    }
}, {timestamps:true})

// category - category_name, _id, createAt, updatedAt

module.exports = mongoose.model("category",categorySchema)

