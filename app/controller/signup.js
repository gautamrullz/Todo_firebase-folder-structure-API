var express=require("express");
var router=express.Router();
var ref = require('../config');
var validator = require('express-validator');
router.use(validator());
router.post("/", function(request, response) {
    // request.body Post Call  use to Bind Body Data
    var email = request.body.email;
    var password = request.body.password;
    console.log(email);
    request.checkBody("email", "Enter a valid email address.").isEmail();
    request.checkBody("password", "Enter a valid password").matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
    request.checkBody('user_name', '4 to 20 characters required').len(4, 20);
    request.checkBody('phone_no', ' 10 characters required').matches(/^([7-9]{1}[0-9]{9})$/);
    var errors = request.validationErrors();
    console.log(errors);
    if (errors) {
        response.send(errors);
        return;
    }
    ref.orderByChild("email").equalTo(email).once("value", function(data) {
      if(data.val()!==null)
      {
      data.forEach(function(snap) {
        response.send({
          "status":false,
          "message":"email already in use"
        });
        return;
      });
    }else {
    var ad = request.body;
    ref.push().setWithPriority(ad, 0 - Date.now());
    ref.once("value", function(data) {
        console.log("signup completed");
        response.send({
            "status": true,
            "message": "registration Successfull"
        });
    });
  }
});
});
module.exports=router; 
