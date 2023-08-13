var childProcess = require('child_process'); 
childProcess.exec('DISPLAY=:0 chromium-browser --app=http://192.168.100.19:8080 --kiosk &');
//childProcess.exec('node server.js');