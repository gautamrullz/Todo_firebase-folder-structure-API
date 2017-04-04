var express = require("express"); //Http  server but framework  node js i will create http server (web services,REST API)
var app = express();
var port = 8081;
var bodyParser = require("body-parser");

app.use(bodyParser.json());
//var validator = require('express-validator');
//var regex = require("regex");
app.use(require('./controller'));

app.listen(port, function() {
    console.log("server port %d has started", port);
});

//module.exports=router;
