var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var ExpressPeerServer = require('peer').ExpressPeerServer;
var path = require('path');
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var peerServer = ExpressPeerServer(server);

var indexRouter = require('./router/index.js');
/*-------------------------------------------------------*/
//app.set('views','./views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*-------------------------------------------------------*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
/*-------------------------------------------------------*/
app.use('/', indexRouter);
app.use('/peerjs', peerServer);
/*-------------------------------------------------------*/
require('./public/js/server.js')(io);
/*-------------------------------------------------------*/
server.listen(3000);
