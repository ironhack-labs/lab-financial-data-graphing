var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var axios = require('axios');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
.then(response =>{
  console.log(response.data)
  printTheChart(response.data)
}).catch(e=>{
  next(e)
})

let printTheChart = ((stockData) => {
  let stockLabels = stockData.map( element => element.date);
  let stockPrice = stockData.map( element => element.close);
  let ctx = document.getElementById("canvas").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockLabels,
      datasets: [{
        label: "Stock Chart",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: stockPrice,
      }]
      }
    });
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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



module.exports = app;
