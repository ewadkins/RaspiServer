
var settings = require('./config').settings;
var fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app).listen(settings.server.port);
console.log('HTTP Server listening on port %s', settings.server.port);

app.use(express.static(__dirname + '/' + settings.server.fileLocation));

app.get('/', function (req, res) {
	var ip = req.ip;
	console.log('Request received from ' + ip);
	var files = fs.readdirSync(settings.server.fileLocation + '/' + settings.server.imageDirectory);
	var html = '<!DOCTYPE html>';
	html += '<head>';
	html += '<title>Memes ftw</title>';
	html += '</head>';
	html += '<body>';
	html += '<div style="padding:5pt">';
	for (var i = 0; i < files.length; i++) {
		html += '<img style="padding:3pt" src="' + settings.server.imageDirectory + '/' + files[i] + '">';
	}
	html += '</div>';
	html += '</body>';
	html += '</html>';
	
	res.send(html);
	//res.redirect(settings.server.index);
});
