// WebSocket.ts

export interface WebSocketMessage {
  action: string;
}

const socket = new WebSocket('localhost:8080');

socket.onopen = () => {
  console.log('WebSocket connected');
};

socket.onmessage = (event) => {
  const message: WebSocketMessage = JSON.parse(event.data.toString());
  console.log('Received message:', message);
};

export function sendWebSocketMessage(message: WebSocketMessage) {
  socket.send(JSON.stringify(message));
}

export default socket;
