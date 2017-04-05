var express = require("express"); //Http  server but framework  node js i will create http server (web services,REST API)
var app = express();
var port = process.env.PORT||8081;
var cors = require("cors");
var bodyParser = require("body-parser");
var validator = require('express-validator');
// var session=require('express-session');
// var cookieParser=require('cookie-parser');
// app.use(cookieParser());
// app.use(session({secret:'anystring',resave: true, saveUninitialized: true}));
var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'logged_in_user',
  keys: ['key1','key2'],
  maxAge: 24 * 60 * 60 * 1000

  // Cookie Options
  //maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(validator());
app.use(bodyParser.json());
app.use(cors());
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));
//var validator = require('express-validator');
//var regex = require("regex");
app.use(require('./controller'));

app.listen(port, function() {
    console.log("server port %d has started", port);
});

//module.exports=router;
