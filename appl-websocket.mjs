import { WebSocketServer } from "ws";
//import PromptSync from "prompt-sync";
import { PromptAsync } from "./PromptAsync.mjs";
const wss = new WebSocketServer({port: 8080})
const promptAsync = new PromptAsync();
wss.on('listening', () => {
    console.log('Server is listening on port 8080');
})
wss.on('connection', (ws, req) => {
    console.log(`connection from ${req.socket.remoteAddress} established`);
    console.log(`body inside request ${req.body}`)
    ws.send('Hello ');
    ws.on('close',() => {
        console.log(`connection from ${req.socket.remoteAddress} closed`)
    })
    ws.on('message', async message => {
        const answer = await promptAsync.prompt(message.toString() + "------>")
        ws.send(answer);
    })
})