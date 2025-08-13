//import SockJS from "sockjs-client";
import Stomp from "stompjs";

let socketClient: any = null;

export function connectSocket() {
  const socket = new WebSocket("ws://localhost:9999/ws");
  socket.onopen = () => console.log("Connected via Gateway!");

  socketClient = Stomp.over(socket);
  socketClient.connect(
    {},
    () => console.log("Connected to WebSocket using gateway"),
    (error: Error) => console.error("WebSocket connection error:", error),
  );
}

export function getSocketClient() {
  return socketClient;
}
