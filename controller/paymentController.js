const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// to pass stripe key to front end

exports.sendStripeKey = (req,res)=>{
    res.send({
        success:true,
        stripeAPIKey: process.env.STRIPE_API_KEY

    })
}

// to process payment
exports.processPayment =async(req,res)=>{
    const myPaymentIntents = await stripe.myPaymentIntents.create({
        amount:req.body.amount,
        currency:'npr',
        metadata:{ integration_check:"accept_a_payment"}
    }) 

    res.send({
        success:true,
        clint_secret:myPaymentIntents.clint_secret
    })
}

