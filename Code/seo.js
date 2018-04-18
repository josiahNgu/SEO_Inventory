var express = require('express');
var app = express();
var server = require('http').createServer(app);
var session = require('client-sessions');


app.set('view_enginer', 'ejs');
server.listen(process.env.PORT || 3000);


var path = require('path')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(path.join(__dirname, 'public')));

var index = require('./index');

app.use('/', index);

app.use('/login', index);

app.use('/signup', index);
app.use('/userSettings',index);
app.use('/updateUser',index);
app.use('/home',index);
// express way of calling the view file, html file, from index.js
//app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('*', function(req, res){
});

