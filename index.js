// const { response } = require('express')
const express = require('express')
require ('dotenv').config()
require ('./Database/connection')
var bodyParser =  require ('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// const { route } = require('./routes/testroute')

// route
const TestRoute = require('./routes/testroute')
const CategoryRoute = require('./routes/categoryRoute')

const ProductRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const OrderRoute =require('./routes/orderRoute')

const paymentRoute = require('./routes/paymentRoute')


const app = express()
const port = process.env.PORT
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use (cors())

app.use('/api',TestRoute)
app.use ('/api',CategoryRoute)
app.use('/api',ProductRoute)
app.use('/api',userRoute)
app.use('/api',OrderRoute)
app.use('/api',paymentRoute)

// use static file
app.use('/api/public/uploads',express.static('public/uploads/'))


const testfunction = (request, response)=> {
    response.send("hello world")
}

app.get('/hello', testfunction)
app.get('/first', (req, res)=>{
    res.send("This is first message.")
})

app.listen(port,()=>{
    console.log(`App started at port ${port}`)
})