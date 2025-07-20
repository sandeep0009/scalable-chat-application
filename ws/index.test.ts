import {describe, expect, test} from "bun:test";




const BACKEND_URL='ws://localhost:8080';

describe('Chat application', () => {

    test('sending message to chat room1 to room2',async()=>{
        const ws1= new WebSocket(BACKEND_URL);
        const ws2= new WebSocket(BACKEND_URL);


        const openWS1= new Promise<void>((resolve)=>{
            ws1.onopen=()=>resolve();
        });

        const openWS2=new Promise<void>((resolve)=>{
            ws2.onopen=()=>resolve();
        });
        await Promise.all([openWS1,openWS2]);

        ws1.send(JSON.stringify({
            type:'join-room',
            room:'Room 1'
        }));

        ws2.send(JSON.stringify({
            type:'join-room',
            room:'Room 1'
        }));



        await new Promise<void>((resolve)=>{

             ws2.onmessage=({data})=>{
            const parsedData=JSON.parse(data);
            expect(parsedData.type="chat");
            expect(parsedData.message="hi there");
            resolve();
        }
        ws1.send(JSON.stringify({
            type:'chat',
            room:'Room 1',
            message:'hi there'
        }));

        })

        

       
    })
 })