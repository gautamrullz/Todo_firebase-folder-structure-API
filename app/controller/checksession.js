var express=require("express");
var router=express.Router();

router.get("/",function (request, response) {
  console.log(request.session);
  if(request.session.user_name==undefined){
    response.send({"status":false,"message":"no user","session":false});
  }else{
    response.send({"status":true,"message":"user exist","session":true});
  }

  // console.log(request.session);

})
module.exports=router;
