/**
 * @author Carlos Briceño
 * App: Server
 * 
 * Structuring Your Files
 * ========================
 * /GUI-face
      /server.js
      /build
         /index.html
         /emoji
         /js
         /css
         /media
 */
const express      = require('express');
const http         = require('http');
const WebSocket    = require('ws');
const { exec } = require('child_process');


const app=express();
app.use(express.static(__dirname + '/build/'));
app.use(express.static(__dirname + '/build/js'));
app.use(express.static(__dirname + '/build/css'));
app.use(express.static(__dirname + '/build/emoji'));

app.get('/', function (req, res) {
    res.sendFile("/build/index.html", {});
});


const server = http.createServer(app);

// WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws,req) {
        console.log("Conected: ", wss.clients.size);

        ws.on('error', console.error);

        ws.on('close', function close() {
            console.log('disconnected');
            console.log("Conected: ", wss.clients.size);
        });

        ws.on('message', function incoming(message) {
            var event = JSON.parse(message);

            console.log("accion: ", event.action + " value: ", event.value);
                
                // Send JSON to WEBGUI
                wss.clients.forEach(function each(client) {
                    if (client !== ws) { // client !== ws && client.readyState === WebSocket.OPEN
                        client.send(JSON.stringify({accion:event.action,value:event.value}));
                      }
                });
        });
});


server.listen(8080,function listening() {
    console.log("Web server Active listening on " + server.address().port);
});

