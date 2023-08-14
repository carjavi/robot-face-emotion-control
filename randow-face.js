/**
 * Archivo para enviar data al server para generar expresiones en WEBGUI
 

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const WebSocketClient= require('ws')
const url = 'ws://localhost:8080' 
const clientWebsocket = new WebSocketClient(url)

clientWebsocket.on('close', function() {
    console.log('The client has disconnected!');
});



clientWebsocket.on('open', function() {
    console.log('Client has connected to the server!');
    // Prompt user to input data in console.
    console.log("exit --> for exit app");
    console.log("============");
    console.log(" ");
    whatEmotion();
});


function whatEmotion() {
    readline.question("Input face-emotion: ", data => {
        console.log(`command: ${data}`);
        if (data == "exit"){
            clientWebsocket.close(); //terminate this connection
            process.exit();
        }
        
        sendWebsocket(data);
        whatEmotion();
    });
}


function sendWebsocket(data) {
    if (clientWebsocket.readyState == 1) { // confirma que esta conectado
       
        clientWebsocket.send(JSON.stringify({
            action: "emotion",
            value: data 
        }));
       
    }
}

*/

  
  
  