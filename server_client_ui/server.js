// Lazer Reveng
// Copyright 2017

// server.js

var http = require('http');
var path = require('path');
var fs = require('fs');

// Config file location
const config = 'config.txt';

// Client file path
const pathToClient = 'client.html';
const pathToLive = 'live.html';

// The client file to send
var client = '';
var live = '';

var clientLoaded = false;
var liveLoaded = false;

//
// Main server for handling GET client requests.
//
// Handles requests like such:
//
//   A) Client connects to server
//   B) Server responds with client.html page
//   C) client.html page responds with GET request
//   D) server responds with json to update client.html
//
// If the server receives a request for 'live' then 
// instead of sending update JSON it sends the live display
// screen.
//
var handler = function(request, response) {
    
  // TODO: Log to text file
  console.log('Received recquest for url ' + request.url);
    
  if (!clientLoaded || !liveLoaded) {
    console.log('Request terminated because client file(s) not loaded.');
    response.writeHead(400,{'Content-Type': 'text/html', 
                              'Access-Control-Allow-Origin': '*' });
    response.end('<html><h1>400 Bad Request</h1><br><h3>Server not ready</h3></html>');
  }
    
  if (request.method == 'GET'){

    var service = request.url.toLowerCase();

    if (service == '/') {
        // Received request to get client.html

        // TODO: store client info?

        response.writeHead(200,{'Access-Control-Allow-Origin':'*',
                                'Access-Control-Allow-Method':'GET',
                                'Content-Type':'text/html'});

        response.end(client);

        console.log('Client ' + request.url + ' page sent.');
    } else if (service == '/update') {
      // Received update from client.html

      // TODO: Validate message was good?

      var responseObj = {};

      response.writeHead(200,{'Access-Control-Allow-Origin':'*',
                              'Access-Control-Allow-Method':'GET',
                              'Content-Type':'application/json'});

      response.end(JSON.stringify(responseObj));

      console.log('Client ' + request.url + ' update sent.');
    }
    else if (service == '/live') {
      // Received request to get live.html

      // TODO: store client info?

      response.writeHead(200,{'Access-Control-Allow-Origin':'*',
                              'Access-Control-Allow-Method':'GET',
                              'Content-Type':'text/html'});

      response.end(live);
    } else {
      console.log('Invalid command ' + service);
      response.writeHead(400, { 'Content-Type': 'text/html', 
                                'Access-Control-Allow-Origin': '*' });
      response.end('<html><h1>400 Bad Request</h1></html>');
    }
  }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

try {
  var clientfs = fs.createReadStream(pathToClient);

  console.log('Opening client.html...');
  clientfs.on('data', function(chunk) { client += chunk; });
  
  clientfs.on('end', function() { 
    clientLoaded = true; 
    console.log('client.html loaded.');
  });
  
  console.log('Opening live.html...');
  livefs = fs.createReadStream(pathToLive);

  livefs.on('data', function(chunk) { live += chunk; });
  livefs.on('end', function() { 
    liveLoaded = true; 
    console.log('live.html loaded.');
  });
  
} catch (ex) {
  console.log('Could not open client file(s). Terminating server...');
    
  // Wait 1s to allow log to finish
  sleep(1000);
    
  process.exit(5);
}

http.createServer(handler).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');