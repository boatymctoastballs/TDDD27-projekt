var express = require('express');

app = express();

app('/', function (req, res)){
	req.send(Hello World!);
}