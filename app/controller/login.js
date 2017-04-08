var express = require("express");
var router = express.Router();

var login = require('../model/login');
var loginObj = new login();
router.post('/', function(request, response) {
    // try {
    var userData = request.body;
      // validation v.checkBody("email").isEmail v.checkBody("password")
    loginObj.checklogin(userData,request).then(
            function(success){
              response.send({
                            "status": true,
                           "message": success,
                           "session":true
                       });
            },
                function(error){
                  // console.log(error);
                  response.send({"error":error});
                }
)
});
module.exports = router;
// module.exports = router;
