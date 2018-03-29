var express = require('express');
var app = express();
var server = require('http').createServer(app);
var session = require('client-sessions');


app.set('view_enginer', 'ejs');
server.listen(process.env.PORT || 3000);

// ====== my code starts here - on sending login form to client ====================

var path = require('path')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



var index = require('./index');

app.use('/', index);

app.use('/login', index);

app.use('/signup', index);

app.use('/rows',index);
// express way of calling the view file, html file, from index.js
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('*', function(req, res){
});

// ==== my code ends here - on sending login form to client ==========