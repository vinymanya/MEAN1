//get http module
var http = require("http");
//fs allow us to read and write contents
var fs = require("fs");
//create a server
var server = http.createServer(function(request, response){
    //see the client URL request:
    console.log("The client request URL:", request.url);
    //creating routes:
    if(request.url === "/"){
        fs.readFile("index.html", "utf8", function(errors, contents){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(contents);
            response.end();
        })
    }else if(request.url === "/ninjas"){
        fs.readFile("ninjas.html", "utf8", function(errors, contents){
            response.writeHead(200, {"Content-Type":"text/html"});
            response.write(contents);
            response.end();
        })
    }else if(request.url === "/dojo/new"){
        fs.readFile("./dojos.html", "utf8", function(errors, contents){
            response.writeHead(200, {"Content-Type":"text/html"});
            response.write(contents);
            response.end();
        })
    }
    //if the request didn't match any of the above urls:
    else{
        response.writeHead(404);
        response.end("The URL requested is not available!");
    }
})
//server's port
server.listen(6789);
//print to terminal
console.log("Running in localhost at port 6789");