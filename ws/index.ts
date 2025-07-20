import { WebSocketServer } from 'ws';
import type { Room } from './types';

const wss = new WebSocketServer({ port: 8080 });


const RELAYER_BACKEND='ws://localhost:3000'

const relayWebSocket=new WebSocket(RELAYER_BACKEND);

relayWebSocket.onmessage=({data})=>{
    const parsedData=JSON.parse(data);
    if(parsedData.type=="chat"){
        const room=parsedData.room;
        rooms[room].socket.map(sc=>sc.send(data));
    }
}


const rooms:Record<string, Room>={};
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data:string) {
     const parsedData=JSON.parse(data);
    if(parsedData.type=="join-room"){
        const room=parsedData.room;
        if(!rooms[room]){
            rooms[room]={
                socket:[]
            }

        }
        rooms[room].socket.push(ws);
    }

    relayWebSocket.send(data);
    


  });

  ws.send('something');
});