import {WebSocket, Server} from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { HotelCommonSchema, WSMessageFormat, WebSocketTriggerEvent } from './types';
import eventEmitter, { RECIEVED_HOTELS_LIST_EVENT } from './EventEmmiter';


class WebSocketHandler {
    public connectedClients: Record<string, WebSocket>
    public wsServer:  Server

    constructor() {
        this.connectedClients = {};
        this.wsServer = new Server({ noServer: true });

        this.wsServer.on('connection', (socket: WebSocket) => {

            const userId: string = uuidv4();

            console.log(`Recieved a new connection. ` + userId);
            this.connectedClients[userId] = socket;

            const connectionMessage: WSMessageFormat = {
                type: "connection_success",
                content: {userId: userId}
            }
            socket.send(JSON.stringify(connectionMessage));

            socket.on('close', () => {
                delete this.connectedClients[userId]
            })

            this.registerToTriggerEvents()

        });
    }

    private sendToUser = (userId: string, json: WSMessageFormat) => {
        this.connectedClients[userId].send(JSON.stringify(json))
    }

    private registerToTriggerEvents = () => {
        eventEmitter.on(RECIEVED_HOTELS_LIST_EVENT, (emitterData: WebSocketTriggerEvent) => {
            this.sendToUser(emitterData.userSessionId, {type: 'hotels_list', content: emitterData.data})
        })
    }
}



export default new WebSocketHandler()
