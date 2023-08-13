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
 */
const express      = require('express');
const http         = require('http');
const WebSocket    = require('ws');
const { exec } = require('child_process');
var wsocket = null;

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
    ExecuteChromium();
});

function ExecuteChromium() {
    exec("DISPLAY=:0 chromium-browser --app=http://localhost:8080 --kiosk", function(error, stdout, stderr) {
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);
        if (error !== null) {
            console.log("exec error: " + error);
        }
    });
}