var login=require("../models/login")
var express=require("express")
const bodyParser = require('body-parser')
var router=express.Router()
const passport = require('passport');
var jwt = require('jwt-simple');
var secret="very secret"
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/',async function(req,res,next){
    var id=req.body.id
    var password=req.body.password
    console.log(req.body)
    if(id.length>6 && password.length>6)
    {
        var hello=await login.login(id,password)
        console.log(hello.id)
        var token = jwt.encode(hello, secret);
        res.send(token)
        console.log("Token is"+token)
        req.login(hello.id,function(err){
            console.log("hello"+hello.id)
            res.send(req.user)
        })
        var decoded = jwt.decode(token, secret);
        // var parse=JSON.parse(decoded)
        console.log("Object is")
        console.log(decoded);
        
    }
    else
        {
            console.log("LOL")
            res.status(505).send("WTF")
        }
})
router.get('/checkauth', passport.authenticate('local'), function(req, res){

    res.status(200).json({
        status: 'Login successful!'
    });

});
router.get("/",(req,res,next)=>{
    console.log("hello")
   console.log("GG"+req.user)
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
    req.logout();
    next()
})
module.exports=router