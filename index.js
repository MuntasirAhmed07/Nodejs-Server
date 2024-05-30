var fs = require('fs');
var http = require('http');
var multer = require('multer');

// Setting up multer for file uploads
var upload = multer({ dest: 'uploads/' });

var server = http.createServer(function(req, res) {

    if (req.url == "/") {
        res.end("This is Home Page");
    } 
    else if (req.url == "/about") {
        res.end("This is About Page");
    } 
    else if (req.url == "/contact") {
        res.end("This is Contact Page");
    } 
    else if (req.url == "/file-write") {
        fs.writeFile('demo.txt', 'hello world', function(err) {
            if (err) {
                res.end('Error writing file');
            } else {
                res.end('File written successfully');
            }
        });
    }

    else if (req.url == "/upload" && req.method.toLowerCase() == 'post') {
        upload.single('file')(req, res, function (err) {
            if (err) {
                res.end('Error uploading file');
            } else {
                res.end('File uploaded successfully');
            }
        });
    } 
    else {
        res.end('Page not found');
    }

});

server.listen(5500, function() {
    console.log("Server listening on port 5500");
});
