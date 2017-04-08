var ref = require('../config');
var signup = function() {
    this.checkSignup = function(bodyData, request) {
        return new Promise(function(resolve, reject) {


            var email = bodyData.email;
            var password = bodyData.password;
            // console.log(email);

            request.checkBody('user_name', 'User name too short').len(4, 20);
            request.checkBody("email", "Enter a valid email address.").isEmail();
            request.checkBody('phone_no', 'invalid phone no "10 characters required"').matches(/^([7-9]{1}[0-9]{9})$/);
            request.checkBody("password", "Enter a valid password").matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
            var errors = request.validationErrors();
            console.log(errors);
            if (errors) {
                reject(errors);
                // return;
            }

            ref.orderByChild("email").equalTo(email).once("value", function(data) {
                if (data.val() !== null) {
                    data.forEach(function(snap) {
                        // response.send({
                        //     "status": false,
                        //     "message": "email already in use"
                        // });
                        reject("email already in use");
                        // return;
                    });
                } else {
                    var ad = bodyData;
                    ref.push().setWithPriority(ad, 0 - Date.now());
                    ref.once("value", function(data) {
                        console.log("signup completed");
                        // console.log(data.val());
                        request.session = ad;
                        // console.log(request.session);
                        // response.send({
                        //     "status": true,
                        //     "message": "registration Successfull",
                        //     "session": true
                        // });
                        resolve("registration Successfull");
                    });
                }
            });
        });

    }
}
module.exports = signup;
