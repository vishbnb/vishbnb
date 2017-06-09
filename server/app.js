const express = require('express');
const logger = require('morgan');
const path = require('path');
const mysql = require('mysql');
const uuid = require('uuid');
const bodyParser = require('body-parser');



const db = require('./db');

const app = express();

require('dotenv').load({path: path.join(__dirname, '../config.env')});

const connection = mysql.createPool({
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

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.render('index', {title: 'Vishbnb', front: true});
});
app.get('/signup', function (req, res) {
  res.render('signup', {title: 'Sign Up'});
});
app.get('/login', function (req, res) {
  res.render('login', {title: 'Log In'});
});

app.post('/addUser', function(req, res) {
      var post = {
        user_id: uuid.v4(),
        email: req.body.Email,
        first_name: req.body.FirstName,
        last_name: req.body.LastName,
        password: req.body.Password
      };
      console.log(post);
      function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from user",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});
    
      connection.query('INSERT INTO User SET ?', post, function(err, result) {
        console.log(err,result);// send response here
        res.json({msg:'success'});
      });

    });

app.get('/dashboard', function (req, res) {
  res.render('dashboard', {title: 'Dashboard'});
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

