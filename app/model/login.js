var ref = require('../config');
var login = function() {

this.checklogin = function(bodyData,request) {
    return new Promise(function(resolve, reject) {

      // console.log(request.body);
      var email = bodyData.email;
      // console.log(email);
      var password = bodyData.password;
      request.checkBody("email","email field empty").notEmpty();
      request.checkBody("password","password field empty").notEmpty();
      var errors = request.validationErrors();
      // console.log(errors);
      if (errors) {
          reject(errors);
          return;
      }
      request.checkBody("email", "Enter a valid email address.").isEmail();
      request.checkBody("password", "Enter a valid password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
      errors = request.validationErrors();
      // console.log(errors);
      if (errors) {
          reject(errors);
          // return;
      }

      ref.orderByChild("email").equalTo(email).once("value", function(data) {
          // console.log(data.val());
          if (data.val() !== null)
          {
              data.forEach(function(snap)
              {
                  var temp = snap.val();
                  if (temp.password == password)
                  {
                      request.session = temp;
                      console.log("you are online");
                      resolve("you are online");
                  }
                   else
                   {
                      reject("Invalid password");

                  }
              });
          }
          else
          {
              reject("Email not registered");
          }
          // console.log(temp);
      });

    });
}
}
module.exports = login;
