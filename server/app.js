const express = require('express');
const logger = require('morgan');
const path = require('path');
const mysql = require('mysql');

const db = require('./db');

const app = express();

require('dotenv').load({path: path.join(__dirname, '../config.env')});

const connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST || 'localhost',
  user     : process.env.MYSQL_USER || 'root',
  password : process.env.MYSQL_PASSWORD || '',
  database : process.env.MYSQL_DB || 'test'
});

db.createTables(connection);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function (req, res) {
  res.render('index', {title: 'Vishbnb'});
});
app.get('/signup', function (req, res) {
  res.render('signup', {title: 'Sign Up'});
});
app.get('/login', function (req, res) {
  res.render('login', {title: 'Log In'});
});

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

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
