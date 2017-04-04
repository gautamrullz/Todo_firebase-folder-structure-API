var express = require('express'),
router = express.Router();
//router.get('/',function(req,res){
//   res.send('main controller');
//});
router.use('/signup',require('./signup'));
router.use('/login',require('./login'));

module.exports = router;
