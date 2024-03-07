const express = require('express');
const app = express();

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const cors = require('cors');
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));


// WebSocket server
wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
      console.log('Received message:', message);
  });
  // ws.send('Server connected');
});

function sendWebSocketMessage(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}



module.exports = {
  sendWebSocketMessage,
  wss
};