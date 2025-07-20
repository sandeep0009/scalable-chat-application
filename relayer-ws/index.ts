import { WebSocketServer ,WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });
const servers:WebSocket[]=[]
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  servers.push(ws);
  ws.on('message', function message(data) {

    servers.filter(socket=> socket!=ws).map((socket)=>socket.send(data));
    console.log('received: %s', data);
  });

  ws.send('something');
});