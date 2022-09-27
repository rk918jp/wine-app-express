const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

// データベース接続情報
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'test'
});

// データベースに接続できたらコンソールにConnectedを表示
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});

app.listen(3000);