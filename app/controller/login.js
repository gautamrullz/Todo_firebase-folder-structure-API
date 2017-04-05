var express=require("express");
var router=express.Router();
var ref = require('../config');
// var validator = require('express-validator');
// router.use(validator());
// router.get("/",function (request, response) {
//   // console.log(request.cookies);
//   // console.log("-------------------------------------");
//   console.log(request.session);
//   response.send({"status":true});
// })

router.post("/", function(request, response) {
  // console.log(request.cookies);
  // console.log("-------------------------------------");
  // console.log(request.session);
console.log(request.body);
    var email = request.body.email;
	console.log(email);
    var password = request.body.password;
    if (email == "" || password == "") {
        if (email == "" && password == "") {
            response.send({
                "status": false,
                "message": "both fields are empty"
            })
            return;
        }
        if (email == "") {
            response.send({
                "status": false,
                "message": "email field empty"
            })
            return;
        } else {
            response.send({
                "status": false,
                "message": "password field empty"
            })
            return;
        }

    } else if (email == undefined || password == undefined) {
        if (email == undefined || password == undefined) {
              response.send({
                  "status": false,
                  "message": "both fields are undefined"
              })
              return;
          }
        if (email == undefined) {
            response.send({
                "status": false,
                "message": "email field undefined"
            })
        } else {
            response.send({
                "status": false,
                "message": "password field undefined"
            })
        }
        return;
    }

    request.checkBody("email", "Enter a valid email address.").isEmail();
    request.checkBody("password", "Enter a valid password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
    var errors = request.validationErrors();
    console.log(errors);
    if (errors) {
        response.send(errors);
        return;
    }

    ref.orderByChild("email").equalTo(email).once("value", function(data) {
        // console.log(data.val());
        if (data.val() !== null) {
            data.forEach(function(snap) {
                var temp = snap.val();
                if (temp.password == password) {
                  // request.session.regenerate();
                  request.session=temp;
                  // console.log(request.session);
                  // request.session.save(function(err) {
                  //   // session saved
                  // })
                  // request.session.destroy(function(err) {
                  //   // cannot access session here
                  // })
                  // request.session.regenerate(function(err) {
                  //   // will have a new session here
                  // })
                    console.log("you are online");
                    response.send({
                        "status": true,
                        "message": "you are online",
                        "session":true

                    });
                } else {
                    response.send({
                        "status": false,
                        "message": "Invalid password"

                    });
                }
            });
        } else {
            response.send({
                "status": false,
                "message": "Invalid email"
            });
        }
        // console.log(temp);
    });

});
module.exports=router;
