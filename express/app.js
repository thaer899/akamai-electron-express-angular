module.exports = () => {
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var EdgeGrid =require('edgegrid');  
var eg = new EdgeGrid({  
  path: __dirname + '/.edgerc',  
  section: 'default'  
});  
var routes = require('./api/routes/index');
var getDiagnosticTools = require('./api/routes/diagnostic-tools')
var app = express();
app.set('eg', eg);

app.use('/', express.static(__dirname + "/angular/dist"));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// angular client build served from /dist

app.use('/', routes);
app.use('/diagnostic-tools/*', getDiagnosticTools);



app.listen(3000, function () {
  console.log('listening on port 3000...');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

}
