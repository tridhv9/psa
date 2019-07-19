var login=require("../models/login")
var express=require("express")
const bodyParser = require('body-parser')
var router=express.Router()
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))




router.post("/",async (req,res,next)=>{
    var id =req.body.login
    var password=req.body.password
    console.log("hello"+id)
    var hello=await login.login(id,password)
    req.session.username=hello
    console.log(hello)
    console.log(req.session.username)
    res.send(hello)
   
})
router.get("/",(req,res,next)=>{
    if(req.session.username!="")
    res.send(req.session.username)
    else
    res.send("gg")
})
router.get("/index",(req,res,next)=>{
    
    res.contentType('application/json');
    var data = JSON.stringify('http://site.example.com/')
    res.header('Content-Length', data.length);
    res.end(data);

    // var req =  jQuery.post(
    //     "http://www.mysite.com:3000"+"/dologin", 
    //      {"username" : username, "password" : password}, 'json').error(function(){
    //         alert("an error occurred");
    //      }).success(function(data) {
    //         window.location = data;
    //      });
 })
router.get("/logout",(req,res,next)=>{
    req.session.username="";
    console.log(err)
})
module.exports=router