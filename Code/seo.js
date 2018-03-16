var express = require('express');
var app = express();
var server = require('http').createServer(app);
var session = require('client-sessions');

app.set('view_enginer', 'ejs');
server.listen(process.env.PORT || 3000);

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "cse.unl.edu",
  user: "tsim",
  password: "60619312"
});

function insertDB (query) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = query;
        con.query(sql, function (err, result) {
        if (err) throw err;
        });
    });
    return;
}

function selectDB (query) {
    con.connect(function(err) {
        if (err) throw err;
        con.query(query, function (err, result, fields) {
          if (err) throw err;
          return result;
        });
    });
}

function updateDB (query) {
    con.connect(function(err) {
        if (err) throw err;
        var sql = query;
        con.query(sql, function (err, result) {
          if (err) throw err;
        });
      });
}

function setUserEPC(email, password, category) {
    req.session.email = email;
    req.session.password = password;
    req.session.currCategory = category;
    req.session.subcategories = getSubcategories(email, password, category);
    req.session.itemName = getItemNames(email, password, category);
    req.session.qtys = getQtys(email, password, category);
    req.session.pricse = getPrices(email, password, category);
    req.session.suppliers = getSuppliers(email, password, category);
}

function getEmail() {
    return req.session.email;
}

function getCurrCategory() {
    return req.session.currCategory;
}

function getSubcategories(email, passwd, curr) {
    return 'sub1,sub2';
}

function getItemNames(email, passwd, curr) {
    return 'item1,item2,item3';
}

function getQtys(email, passwd, curr) {
    return '1,2,3';
}

function getPrices(email, passwd, curr) {
    return '1.00,2.00,3.00';
}

function getSuppliers(email, passwd, curr) {
    return 'sup1,sup2,sup3';
}

function getStatuss(email, passwd, curr) {
    return 'Low,Good,Good';
}

function login(email, password) {
    setUserEPC(email, password, '');
    window.open("home.html", "_self");
    // if(userExists(email, password)) {
    //     setUserEPC(email, password, '');
    //     window.open("home.html", "_self");
    // } else {
    //     window.open("login.html", "_self");
    // }
}

function logout() {

}

function userExists(email, password) {
    return true;
}

function signup(email, password1, password2) {
    if ( (password1 == password2) && (password1 != '') && (password2 != '') && email.includes('@')) {
        user = new User(email, password1);
        createUser(user);
        setEmail(email);
        setCategory("");
        window.open('userSettings.html', "_self");
    }else{
        window.open("login.html", "_self");
    }
}

function createUser(user) {
    //mysql insert
}

function isUser() {
    return true;
}

function saveUserSettings(firstName, middleName, lastName, phoneNumber, notifications, street, city, state, zip, country) {
    if(addressExists(street, city, state, zip, country)) {
        addressId = getAddress(street, city, state, zip, country);
    }else{
        addressId = insertAddress(street, city, state, zip, country);
    }
    if(userInfoExists(firstName, middleName, lastName, phoneNumber, notifications)) {
        updateUserInfo(firstName, middleName, lastName, phoneNumber, notifications);
    }else{
        insertUserInfo(firstName, middleName, lastName, phoneNumber, notifications);
    }
    window.open('userSettings.html', "_self");
}

function addressExists(street, city, state, zip, country) {
    return true;
}

function getAddress(street, city, state, zip, country) {
    return 0;
}

function insertAddress(street, city, state, zip, country) {
    return 0;
}

function userInfoExists(firstName, middleName, lastName, phoneNumber, notifications) {
    return true;
}

function updateUserInfo(firstName, middleName, lastName, phoneNumber, notifications) {

}

function insertUserInfo(firstName, middleName, lastName, phoneNumber, notifications) {

}

function saveCategory(name) {
    //Update
    if (categoryExists(name)) {
        updateCategory(name);
    }else{
        insertCategory(name);
    }
}
function categoryExists(name) {
    return true;
}

function updateCategory(name) {
    return;
}

function insertCategory(name) {
    return;
}

function saveItem(name, price, qty, status, supplier) {
    if (itemExists(name, price, qty, status, supplier)) {
        updateItem(name, price, qty, status, supplier);
    }else{
        insertItem(name, price, qty, status, supplier);
    }
    window.open('home.html', "_self");
}

function itemExists(name, price, qty, status, supplier) {
    return true;
}

function updateItem(name, price, qty, status, supplier) {
    return;
}

function insertItem(name, price, qty, status, supplier) {
    return;
}

function addQty(item) {
    //update quantity q
    window.open('home.html', "_self");
}
function subdQty(item) {
    //update quantity q
    oldQty = getQty(name, price, status, supplier)
    window.open('home.html', "_self");
}

