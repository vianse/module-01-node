var app = require('http').createServer(handler)
var http = require("http");
var io = require('socket.io')(app);
var fs = require('fs');
url = "http://maps.googleapis.com/maps/api/directions/json?origin=Central Park&destination=Empire State Building&sensor=false&mode=walking";
var port = process.env.PORT || 8080;

app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
    io.on('disconnect', function (socket) {
    	console.log(data);
    });
  });
});

// get is a simple wrapper for request()
// which sets the http method to GET
var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
        data,
        route;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        console.log(buffer);
        console.log("\n");
        data = JSON.parse(buffer);
        route = data.routes[0];

        // extract the distance and time
        socket.emit("datos", function(data){
        	 console.log("Walking Distance: " + route.legs[0].distance.text);
        console.log("Time: " + route.legs[0].duration.text);
        })
       
    }); 
}); 