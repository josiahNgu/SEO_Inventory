var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var email;

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
email = req.body.email;
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
	var userExist = false;
	var sql1 = "select * from jngu.User where email = '"+email1+"'";
	con.query(sql1,function(err,result){
		if(err) throw err;
		if (result.length > 0){
			console.log("user exists");
			userExist = true;
		}
		if(!userExist){
			var sql = "insert into jngu.User (email,passwd) values ('" +email1 + "','" + pw1 + "')";
			con.query(sql,function(err,result){
			if(err) throw err;
			});
		}
	});
    
      res.render('login.html', function(err, login) {
      res.send(login);
      });
    
  }
    
  });
 
//Note: category have to be created before adding item 
router.post('/addItem',function(req,res,next){
  console.log("function called");
  var itemName = req.body.itemName;
  var itemStatus = req.body.itemStatus;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var supplier = req.body.supplier;
  var category = req.body.category;
  
  var sql = "select categoryId from jngu.Category where categoryName = '"+ category +"'";
  con.query(sql,function(err,result){
	 if(err) throw err;
	 var id = result[0].categoryId;
	 var sql1 = "INSERT INTO jngu.Item (categoryId,itemName,qty,price,itemStatus,supplier,category) values('" + id + "','" +
  itemName + "','" + quantity + "','"  + price + "','"  + itemStatus + "','" +supplier+ "','" + category+"')";
		con.query(sql1,function(err,result){
			if(err) throw err;
		});
	 
  });
  res.render('home.html', function(err, home) {
    console.log('return to home page');
    res.send(home);
  });
});

router.post('/addCategory',function(req,res,next){
  console.log("add catgy");
  var CategoryName = req.body.categoryName;
  console.log(CategoryName);
  //hardcode inventory name into 'Inventory'
  var sql = "insert into jngu.Inventory (inventoryName,email) values ('Inventory', '" + email + "')";
  con.query(sql,function(err,result){
      if(err) throw err;
	  var id = result.insertId;
	  var sql1 = "insert into jngu.Category (categoryName,inventoryId) values ('" + CategoryName + "','" + id + "')";
	  con.query(sql1,function(err,result){
		  if(err) throw err;
	  });
	  
    });
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
router.post('/userSettings',function(req,res){
  res.render('userSettings.html',function(err,userSettings){
  	res.send(userSettings);
  });
});

router.post('/updateUser',function(req,res,next){
console.log("update user info");
 res.render('home.html',function(err,home){
 	res.send(home);
 });
});

router.post('/home',function(req,res,next){
  res.render('home.html',function(err,home){
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


