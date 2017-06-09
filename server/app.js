var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});
 
connection.connect();

const query = `
CREATE TABLE User (user_id VARCHAR(100) PRIMARY KEY,
first_name varchar(100),
last_name varchar(50),
address varchar(200),
city varchar(50),
state varchar(50),
zip_code INT(5),
phone_number INT(10),
email  varchar(100),
rating varchar(4),
reviews varchar(500),
profile_image varchar(100),
credit_card_details varchar(50));
`;
 
connection.query(query, function (error, results, fields) {
 
});
 
connection.end();

const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();

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
