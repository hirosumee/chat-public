var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var socketio=require('./socket.io/socketio');
var mongoose=require('mongoose');
var app = express();
var http=require('http');
var server =http.createServer(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//
 var key='mongodb://hirosume:cuong299@ds129166.mlab.com:29166/chatpublic';
 mongoose.connect(key,{useMongoClient:true},function(err,db){
   if(err){
     console.log('Can not connect to mongodb',err);
   }else {
     console.log('connected to mongodb',key);
   }
 });
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));g
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
socketio(server);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var port=process.env.PORT||3000;
server.listen(port,function(){
  console.log('server is listenning on port: '+port);
});
// module.exports = app;
