var express = require('express');
var app = express();
var server = require('http').createServer(app);
var session = require('client-sessions');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var email;

app.set('view_enginer', 'ejs');
server.listen(process.env.PORT || 3000);


var path = require('path')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(path.join(__dirname, 'public')));

var con = mysql.createConnection({
  host: "cse.unl.edu",
  user: "jngu",
  password: "bZ4:9y",
});

/* GET home page. */
app.get('/', function(req, res, next) {
res.render('login.html', function(err, login) {
  res.send(login);
});
});
/* process login form */
app.post('/login', function(req, res, next) {
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
   
    res.redirect('/home');
    res.end();
  }
  else{
    res.redirect(req.get('referer'));
  }
  });
  });
  
app.get('/home',function(req,res){
   var sql = "select d.email, a.categoryName, c.itemName, c.qty, c.price, c.supplier from jngu.Category a join " +
  "jngu.Inventory b on b.inventoryId = a.inventoryId join jngu.Item c on a.categoryId = c.categoryId " +
	"join jngu.User d on d.email = b.email where d.email = '" + email +  "'" ;
	var sql1 = "select categoryName from jngu.Category";
    con.query(sql,function(err,result1){
      if(err) throw err;
      else{
		  con.query(sql1,function(err,result2){
			 if(err) throw err;
			res.render('database.ejs',{user:result1, user2:result2});			 
		  });
        
      }
    });
  });


/* process registration form  */
app.post('/signup', function(req, res, next) {
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
	//update to throw error message to user
     res.render('login.html', function(err, login) {
    res.send(login);
    }); 
  });
 
//Note: category have to be created before adding item 
app.post('/addItem',function(req,res,next){
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
			res.redirect('/home');
		});
	 
  });

});

//add Category button
app.post('/addCategory',function(req,res,next){
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
//   res.render('database.ejs', function(err, home) {
//     console.log('return to home page');
//     res.send(home);
//  });
res.redirect('/home');

});
//edit Item
app.post('/editItem',function(req,res,next){
  console.log("edit Item");
  var itemName = req.body.itemName;
  var itemStatus = req.body.itemStatus;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var supplier = req.body.supplier;
  var category = req.body.category;
  
  if(price != 0){
	  var sql = "update jngu.Item set price = '"+ price +"' where itemName = '"+ itemName +"'";
	  con.query(sql,function(err,result){
	  if(err) throw err;
  });
  }
  if(quantity != 0){
	  var sql = "update jngu.Item set qty = '"+ quantity +"'where itemName = '"+ itemName +"'";
	  con.query(sql,function(err,result){
	  if(err) throw err;
  });
  }
  if(supplier != 0 ){
	  var sql = "update jngu.Item set supplier = '"+ supplier +"'where itemName = '"+ itemName +"'";
	  con.query(sql,function(err,result){
	  if(err) throw err;
  });
  }
  res.render('home.html', function(err, home) {
    console.log('return to home page');

  res.redirect('/home');

});
});

app.post('/userSettings',function(req,res){
  res.render('userSettings.html',function(err,userSettings){
    res.send(userSettings);
    res.end();
  });
});

app.post('/updateUser',function(req,res,next){
console.log("update user info");
res.redirect('/home');

});

app.post('/deleteItem',function(req,res,next){
	console.log("delete Item");
	var itemName = req.body.itemName;
	console.log(itemName);
	
	var sql = "delete from jngu.Item where itemName = '"+ itemName + "'";
	con.query(sql,function(err,result){
		if(err) throw err;
	});	
	res.render('home.html', function(err, home){
		console.log('return to home page');
		
	res.redirect('/home');
	});	
});

app.post('/home',function(req,res,next){
 res.redirect('/home');

});

app.post('/logout',function(req,res,next){
  console.log("logout");
res.render('login.html',function(err,login){
res.send(login);
});
});

module.exports = router;



// express way of calling the view file, html file, from index.js
//app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('*', function(req, res){
});
