import { io } from "socket.io-client";

const SOCKET_URL = "https://api.puntdata.com.au"; // backend socket url

const socket = io(SOCKET_URL, {
 transports: ["polling", "websocket"],
  withCredentials: true,
  autoConnect: true,
});

export default socket;
