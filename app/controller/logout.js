var express = require("express");
var router = express.Router();

router.get("/", function(request, response) {
    // console.log(request.session);
    request.session = null;
     console.log(request.session);
    response.send({
        "status": false,
        "message": "logout success",
        "session": false
    });
})


module.exports = router;
