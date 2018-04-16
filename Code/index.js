var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "cse.unl.edu",
  user: "jngu",
  password: "bZ4:9y",
});





/* GET home page. */
router.get('/', function(req, res, next) {
res.render('login.html', function(err, login) {
  res.send(login);
});
});

/* process login form */
router.post('/login', function(req, res, next) {
var email = req.body.email;
var pw = req.body.pw;
console.log("post received: %s %s", email, pw);
var realPassword ;
var sql = "select passwd from  jngu.User where email = '"+ email +"'";

con.query(sql,function(err,result){
if(result.length>0){
realPassword = result[0].passwd;
}
console.log(realPassword);
if(realPassword==pw){
  console.log("realP = pw ");
  res.render('home.html', function(err, home) {
  res.send(home);
  });
}
else{
  res.redirect(req.get('referer'));
}
});
});


  
/* process registration form  */
router.post('/signup', function(req, res, next) {
  var email1 = req.body.email1;
  var pw1 = req.body.pw1;
  var pw2 = req.body.pw2;
  console.log("post received: %s %s %s", email1, pw1, pw2); 
  if(pw1 == pw2){
    console.log("inside");
    if(userExist==false){
    var sql = "insert into jngu.User (email,passwd) values ('" +email1 + "','" + pw1 + "')";
    con.query(sql,function(err,result){
      if(err) throw err;
    });
    res.render('login.html', function(err, login) {
      res.send(login);
      });
    }
  }
    console.log("user exists");
  });
router.post('/addItem',function(req,res,next){
  console.log("function called");
  var itemName = req.body.itemName;
  var itemStatus = req.body.itemStatus;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var supplier = req.body.supplier;
  var category = req.body.category;
  var sql = "INSERT INTO jngu.Item (itemName,qty,price,itemStatus,supplier,category, inventory) values('" +
  itemName + "','" + quantity + "','"  + price + "','"  + itemStatus + "','" +supplier+ "','" + category+"','1')";
  con.query(sql, function (err, result) {
    if(err) throw err;
    res.redirect('#');
    });
});

router.post('/addCategory',function(req,res,next){
  console.log("add catgy");
  var CategoryName = req.body.catgyName;
  console.log(CategoryName);
  res.render('home.html', function(err, home) {
    console.log('return to home page');
    res.send(home);
  });
});

router.post('/editItem',function(req,res,next){
  console.log("edit Item");
  var itemName = req.body.itemName;
  var itemStatus = req.body.itemStatus;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var supplier = req.body.supplier;
  var category = req.body.category;
  console.log(itemName);
  res.render('home.html', function(err, home) {
    console.log('return to home page');
    res.send(home);
});
});
router.post('/editCategory',function(req,res,next){
  console.log("edit catgy");
  var CategoryName = req.body.newCatgyN;
  console.log(CategoryName);
  res.render('home.html', function(err, home) {
    console.log('return to home page');
    res.send(home);
  });
});

router.post('/logout',function(req,res,next){
  console.log("logout");
res.render('login.html',function(err,login){
res.send(login);
});
});

module.exports = router;



