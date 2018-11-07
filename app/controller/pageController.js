var express = require('express');
var router = express.Router();

var pageController = {
	getIndex : function(req,res,next){
		res.render('page/index',{title: 'Call'});
	}
}
module.exports = pageController;