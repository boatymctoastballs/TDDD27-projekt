var express = require('express');
//var routes = require('index.js');

app = express();

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs')
//app.use('/', routes);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/views/view1.html');
});

app.use('/js', express.static(__dirname + '/build/js'));

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});

//module.exports = app;