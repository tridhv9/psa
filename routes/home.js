var router=require("express").Router()
router.get("/",(req,res)=>{
    if(req.session.username!="")
        res.send("hello world")
})

module.exports=router