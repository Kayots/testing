const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//create mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "root",
  database:"test1",
});

// middleware
app.use(bodyParser.json());

// middleware for urlencoded form
// app.use(bodyParser.urlencoded({ extended: false }));

//homepage
app.get("/", (req, res, next) => {
    console.log("CRUD");
    res.send("/new to create new user\n/search to search a user\n/update to edit an existing user\n/delete to delete a user");
});

//CREATE
app.get("/new", (req, res, next) => {
  connection.query(`INSERT INTO TABLE1(FIRSTNAME, LASTNAME, PHONE, ADDRESS1, ADDRESS2, EMAIL) VALUES ("${req.query.firstname}", "${req.query.lastname}", 
    "${req.query.phone}", "${req.query.address1}", "${req.query.address2}", "${req.query.email}" )`, 
   function (err, results) {
    if (err) throw err;
    console.log(results);
    res.send("User Created!");
    next()
  });
});

//READ
app.get("/search", (req, res, next) => {
  connection.query(`SELECT * FROM TABLE1 WHERE ${req.query.condition} = "${req.query.value}"`,
   function (err, results) {
    if (err) throw err;
    console.log(results);
    res.send(results);
    next()
  });
});

//UPDATE
app.get("/update", (req, res, next) => {
  connection.query(`UPDATE TABLE1 SET ${req.query.change} = "${req.query.value}" WHERE ${req.query.change} = "${req.query.condition}"`,
   function (err, results) {
    if (err) throw err;
    console.log(results);
    res.send("User Updated");
    next()
  });
});

//DELETE
app.get("/delete", (req, res, next) => {
  connection.query('DELETE FROM TABLE1 WHERE FIRSTNAME = ?',
  [req.query.firstname],
   function (err, results) {
    if (err) throw err;
    console.log(results);
    res.send("User Deleted!");
    next()
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

