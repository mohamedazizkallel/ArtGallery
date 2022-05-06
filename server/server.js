// Setting up Express & Middlewares
var express = require('express');
var path = require('path');
var logger = require('morgan'); // HTTP Logging Middleware
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

// Connecting to the DB
const uri = process.env.MONGO_URI

mongoose.connect(uri)
  .then(() =>  console.log('Connected to the DB'))
  .catch((err) => console.error(err));

// Creating the app
var app = express();

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

// Routes
var paintingRoute = require('./routes/painting.routes');
app.use('/api/v1/painting', paintingRoute);

// Catching 404 error and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing the error in dev
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.send(err);
});

const PORT = process.env.port;

app.listen( PORT || 4000, function(){
  console.log(`Now listening on port ${PORT}`);
})

module.exports = app;
