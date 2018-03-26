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
    req.session.inventoryId = getInventoryId(email);
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

function getInventoryId(email) {
    return selectDB();
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
}

function logout() {

}

function userExists(email, password) {
    return true;
}

function signup(email, password1, password2) {
    if ( (password1 == password2) && (password1 != '') && (password2 != '') && email.includes('@')) {
        createUser(email, password1);
        setUserEPC(email, password1, '');
        window.open('userSettings.html', "_self");
    }else{
        window.open("login.html", "_self");
    }
}

function createUser(email, password) {
    //mysql insert
    insertDB('insert into User (email,passwd) values (\''+email+'\',\''+password+'\');');
}

function isUser(email, password) {
    realPassword = selectDB('select passwd from User where email = \''+email+'\';');
    if(realPassword == '') {
        return false;
    }
    if(password == realPassword) {
        return true;
    }else{
        return false;
    };
}

function saveUserSettings(firstName, middleName, lastName, phoneNumber, notifications, street, city, state, zip, country, email, parentCatetgory) {
    if(addressExists(street, city, state, zip, country, email, parentCatetgory)) {
        updateAddress(street, city, state, zip, country, email, parentCatetgory);
    }else{
        addressId = insertAddress(street, city, state, zip, country, email, parentCatetgory);
    }
    if(userInfoExists(firstName, middleName, lastName, phoneNumber, notifications)) {
        updateUserInfo(firstName, middleName, lastName, phoneNumber, notifications);
    }else{
        insertUserInfo(firstName, middleName, lastName, phoneNumber, notifications);
    }
    window.open('userSettings.html', "_self");
}

function addressExists(street, city, state, zip, country, email, parentCatetgory) {
    if(selectDB() == "") {
        return false;
    }else{
        return true;
    };
}

function updateAddress(street, city, state, zip, country, email, parentCatetgory) {
    updateDB();
}

function insertAddress(street, city, state, zip, country, email, parentCatetgory) {
    insertDB();
}

function userInfoExists(firstName, middleName, lastName, phoneNumber, notifications, email, parentCatetgory) {
    if( selectDB('select * from UserInfo where email = \''+email+'\';)') == "") {
        return false;
    }else{
        return true;
    }
}

function updateUserInfo(firstName, middleName, lastName, phoneNumber, notifications, email, parentCatetgory) {
    updateDB();
}

function insertUserInfo(firstName, middleName, lastName, phoneNumber, notifications, email, parentCatetgory) {
    insertDB();
}

function saveCategory(name, email, parentCatetgory) {
    //Update
    if (categoryExists(name, email, parentCatetgory)) {
        updateCategory(name, email, parentCatetgory);
    }else{
        insertCategory(name, email, parentCatetgory);
    }
    window.open('home.html', "_self");
}
function categoryExists(name, email, parentCatetgory) {
    if(selectDB() == "") {
        return false;
    }else{
        return true;
    }
}

function updateCategory(name, email, parentCatetgory) {
    updateDB();
}

function insertCategory(name, email, parentCatetgory) {
    insertDB();
}

function saveItem(name, price, qty, status, supplier, email, parentCatetgory) {
    if (itemExists(name, price, qty, status, supplier, email, parentCatetgory)) {
        updateItem(name, price, qty, status, supplier, email, parentCatetgory);
    }else{
        insertItem(name, price, qty, status, supplier, email, parentCatetgory);
    }
    window.open('home.html', "_self");
}

function itemExists(name, price, qty, status, supplier, email, parentCatetgory) {
    if(selectDB() == "") {
        return false;
    }else{
        return true;
    };
}

function updateItem(name, price, qty, status, supplier, email, parentCatetgory) {
    updateDB();
}

function insertItem(name, price, qty, status, supplier, email, parentCatetgory) {
    insertDB('insert into Item (itemName, qty, price, itemStatus, supplier, categoryId) values (\''+name+'\','+price+','+qty+',\''+status+'\',\''+supplier+'\', (select categoryId from Category where categoryName = \''+parentCatetgory+'\' AND inventoryId = 1));');
}