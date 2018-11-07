var express = require('express');
var router = express.Router();

var pageController = require('../app/controller/pageController.js');

router.get('/',pageController.getIndex);
module.exports = router;