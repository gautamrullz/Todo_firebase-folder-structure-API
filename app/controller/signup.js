var express = require("express");
var router = express.Router();

var signup = require('../model/signup');
var signupObj = new signup();
router.post("/", function(request, response) {
    // request.body Post Call  use to Bind Body Data
    var userData = request.body;
      // validation v.checkBody("email").isEmail v.checkBody("password")
    signupObj.checkSignup(userData,request).then(
            function(success){
              response.send({
                            "status": true,
                           "message": success,
                           "session":true
                       });
            },
                function(error){
                  console.log(error);
                  response.send({"error":error});
                }
)
});
module.exports=router;
