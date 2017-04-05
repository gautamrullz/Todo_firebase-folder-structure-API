var express=require("express");
var router=express.Router();

router.get("/",function (request, response) {
  // request.session.destroy(function(err) {
  // // cannot access session here
  // })
  console.log(request.session);

//   request.session.destroy(function(err) {
//   // cannot access session here
// })
  request.session=null;
  // console.log(request.cookies);
  // console.log("-------------------------------------");
  // console.log(request.session);
  console.log(request.session);
  response.send({"status":false,"message":"logout success","session":false});
})


module.exports=router;
