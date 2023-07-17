import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path'
// import cookieParser from  "cookie-parser";
import cors from 'cors';
import router from './routes';
import * as http from 'http';
import * as WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import eventEmitter, { RECIEVED_HOTELS_LIST_EVENT } from "./EventEmmiter";
import cookieParser from  "cookie-parser";
import WebSocketHandler from './websocket' 

dotenv.config({ path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`) || `../.env.development` });
const port = process.env.PORT;

const app: Express = express();
app.use(cookieParser())


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", router)




const Server: http.Server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

Server.on('upgrade', (request, socket, head) => {
    WebSocketHandler.wsServer.handleUpgrade(request, socket, head, socket => {
        WebSocketHandler.wsServer.emit('connection', socket, request);
    });
});
