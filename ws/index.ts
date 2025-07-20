import { WebSocketServer } from 'ws';
import type { Room } from './types';

const wss = new WebSocketServer({ port: 8080 });


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
    if(parsedData.type=="chat"){
        const room=parsedData.room;
        rooms[room].socket.map(sc=>sc.send(data));
    }

    console.log('received: %s', data);
  });

  ws.send('something');
});