import { createContext, useEffect, useState, useRef } from "react";
import { WS_URL } from '../config';
import { WebSocketMessage } from "../types/types";


export const WebsocketContext = createContext<[boolean, WebSocketMessage, any]>([false, {type: "", content: {}}, () => {}]);


export const WebsocketProvider = ({ children }: any) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState<WebSocketMessage>({type: "", content: {}});

  const ws: any = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = (event) => setVal(JSON.parse(event.data));

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const ret:[boolean, WebSocketMessage, any] = [isReady, val, ws.current?.send.bind(ws.current)];

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
};