exports.testfunction =(req,res)=>{
    res.send("This message is form controller")
}

exports.hellofunction = (req,res)=>{
    res.send(`hello ${req.params.name}`)
}