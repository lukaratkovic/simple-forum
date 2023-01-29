const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('promise-mysql');
const path = require('path');
const cors = require('cors');
const config = require('./config');
let pool;

initDb = async () => {
  pool= await mysql.createPool(config.pool);
}

initDb();
app.use(express.static(__dirname+'/public/app'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const apiRouter = express.Router();

apiRouter.get('/', function(req, res) {
  res.json({ message: 'Dobro dosli na nas API!' });
});

apiRouter.route('/posts').get(async function(req,res){
  try {
    let conn = await pool.getConnection();
    let rows = await conn.query('SELECT * FROM posts');
    conn.release();
    res.json({ status: 'OK', posts:rows });
  } catch (e){
    console.log(e);
    return res.json({"code" : 100, "status" : "Error with query"});
  }
}).post(async function(req,res){
  const post = {
    comment : req.body.comment,
    timestamp : new Date(),
    userId : req.body.userId
  };
  console.log(post)

  try {
    let conn = await pool.getConnection();
    let q = await conn.query('INSERT INTO posts SET ?', post);
    conn.release();
    res.json({ status: 'OK', insertId:q.insertId });
  } catch (e){
    console.log(e);
    res.json({ status: 'NOT OK' });
  }
}).put(async function(req,res){
  const post = {
    comment : req.body.comment,
    userId : req.body.userId
  };
  console.log(post)

  try {
    let conn = await pool.getConnection();
    let q = await conn.query('UPDATE posts SET ? WHERE _id = ?', [post,req.body._id]);
    conn.release();
    res.json({ status: 'OK', changedRows:q.changedRows });
    console.log(q);
  } catch (e){
    res.json({ status: 'NOT OK' });
  }
}).delete(async function(req,res){
  res.json({"code" : 101, "status" : "Body in delete request"});
});

apiRouter.route('/posts/:_id').get(async function(req,res){
  try {
    let conn = await pool.getConnection();
    let rows = await conn.query('SELECT * FROM posts WHERE _id=?',req.params._id);
    conn.release();
    res.json({ status: 'OK', user:rows[0]});
  } catch (e){
    console.log(e);
    return res.json({"code" : 100, "status" : "Error with query"});
  }
}).delete(async function(req,res){
  try {
    let conn = await pool.getConnection();
    let q = await conn.query('DELETE FROM posts WHERE _id = ?', req.params._id);
    conn.release();
    res.json({ status: 'OK', affectedRows :q.affectedRows });
  } catch (e){
    res.json({ status: 'NOT OK' });
  }
});

apiRouter.route('/users').get(async function(req,res){
  try {
    let conn = await pool.getConnection();
    let rows = await conn.query('SELECT * FROM users');
    conn.release();
    res.json({ status: 'OK', users:rows });
  } catch (e){
    console.log(e);
    return res.json({"code" : 100, "status" : "Error with query"});
  }
}).post(async function(req,res){
  const user = {
    name : req.body.name,
    username : req.body.username,
    password : req.body.password,
    email : req.body.email
  };
  console.log(user)

  try {
    let conn = await pool.getConnection();
    let q = await conn.query('INSERT INTO users SET ?', user);
    conn.release();
    res.json({ status: 'OK', insertId:q.insertId });
  } catch (e){
    console.log(e);
    res.json({ status: 'NOT OK' });
  }
}).put(async function(req,res){
  const user = {
    name : req.body.name,
    username : req.body.username,
    password : req.body.password,
    email : req.body.email
  };
  console.log(req.body);

  try {
    let conn = await pool.getConnection();
    let q = await conn.query('UPDATE users SET ? WHERE _id = ?', [user,req.body._id]);
    conn.release();
    res.json({ status: 'OK', changedRows:q.changedRows });
    console.log(q);
  } catch (e){
    res.json({ status: 'NOT OK' });
  }
}).delete(async function(req,res){
  res.json({"code" : 101, "status" : "Body in delete request"});
});

apiRouter.route('/users/:_id').get(async function(req,res){
  try {
    let conn = await pool.getConnection();
    let rows = await conn.query('SELECT * FROM users WHERE _id=?',req.params._id);
    conn.release();
    res.json({ status: 'OK', user:rows[0]});
  } catch (e){
    console.log(e);
    return res.json({"code" : 100, "status" : "Error with query"});
  }
}).delete(async function(req,res){
  console.log(req.params);
  try {
    let conn = await pool.getConnection();
    let q = await conn.query('DELETE FROM users WHERE _id = ?', req.params._id);
    conn.release();
    res.json({ status: 'OK', affectedRows :q.affectedRows });
  } catch (e){
    res.json({ status: 'NOT OK' });
  }
});

app.use('/api', apiRouter);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

app.listen(config.port);
console.log('Running on port ' + config.port);
