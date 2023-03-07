let Order= require('../Models/OrderModel')
let OrderItems = require('../Models/OrderItemsModel')


// place order
exports.placeorder = async (req,res)=>{
    let orderItemsIds = await Promise.all(
        req.body.orderItems.map(async orderItem=>{
            let orderItemToAdd = new OrderItems({
                product:orderItem.product,
                quantity:orderItem.quantity
            })
            orderItemToAdd = await orderItemToAdd.save()
            if(!orderItemToAdd){
                return res.status(400).json({error:"Something went wrong"})
            }
            return orderItemToAdd._id
        })         
    )

    // calulate total price
    let individualTotal = await Promise.all(
        orderItemsIds.map(async orderItemId=>{
            let item = await OrderItems.findById(orderItemId).populate('product','product_price')
            return item.quantity*item.product.product_price
        })
    )
    let totalprice = individualTotal.reduce((acc,cur)=>acc+cur)
    
    let newOrder = new Order({
        orderItems: orderItemsIds,
        user: req.body.user,
        shipping_address: req.body.shipping_address,
        alternate_shipping_address: req.body.alternate_shipping_address,
        city: req.body.city,
        country:req.body.country,
        zipcode:req.body.zipcode,
        phone:req.body.phone,
        total_price:req.body.total_price,
        payment_info:req.body.payment_info
    })
    newOrder = await newOrder.save()
    if(!newOrder){
        return res.status(400).json({error:"Failed to place order"})
    }
    res.send(newOrder)
}

// to view all order
exports.getAllOrder = async (req,res)=>{
    let orders = await Order.find()
    .populate({path:'orderItems',populate:{path:'product',populate:'category'}})
    .populate('user','username')
    if(!orders){
        return res.status(400).json({errer:"Something went wrong"})
    }
    res.send(orders)
}

// to get order details
exports.getOrderDetalis = async (req,res)=>{
    let order = await Order.findById(req.params.id)
    .populate({path:'orderItems',populate:{path:'product',populate:'category'}})
    .populate('user','username')
    if(!order){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(order)
}

// to get orders of a user
exports.getUserOrders = async(req,res)=>{
    let orders = await Order.find({user:req.params.userid})
    if(!orders){
        return res.status(400).json ({error:"Something went wrong"})

    }
    res.send(orders)
}

// to update order status
exports.updateOrder = async (req,res)=>{
    let order = await Order.findByIdAndUpdate (req.params.orderid,{
        status:req.body.status 
    },{new:true})
    if(!order){
        return res.stauts(400).json({error:"Something went wrong"})
    }
    res.send(order)
}

// to delete order
exports.deleteOrder =(req,res)=>{
    Order.findByIdAndRemove(req.params.orderid)
    .then(order=>{
        if(!order){
            return res.status(400).json({error:"order not found"})
        }
        order.orderItems.map(orderItem=>{
            OrderItems.findByIdAndDelete(orderItem)
            .then(orderItem=>{
                if(!orderItem)
                return res.status(400).json({error:"Something went wrong"})
            })
            res.send({message:"order deleted"})
        })
        .catch(error=>res.status(400).json({error:error.message}))
    })
}