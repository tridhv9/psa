var router=require("express").Router()
var jwt = require('jwt-simple');
var secret="very secret"
router.get("/",async (req,res)=>{
   if(req.params.user)
    var decoded = jwt.decode(token, secret);
    // var parse=JSON.parse(decoded)
    console.log("Object is")
    console.log(decoded);
})

module.exports=router