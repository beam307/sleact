import SocketIO from "socket.io";
import http from "http";
import { Express } from "express";

const onlineMap: any = {};
export default (server: http.Server, app: Express) => {
  const io = SocketIO(server, {
    path: "/socket.io",
  });
  app.set("io", io);
  app.set("onlineMap", onlineMap);
  const dynamicNsp = io.of(/^\/ws-.+$/).on("connect", (socket) => {
    const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    // broadcast to all clients in the given sub-namespace
    socket.emit("hello", socket.nsp.name);
    socket.on("login", ({ id, channels }) => {
      onlineMap[socket.nsp.name][socket.id] = id;
      newNamespace.emit(
        "onlineList",
        Object.values(onlineMap[socket.nsp.name])
      );
      channels.forEach((channel: any) => {
        socket.join(`${socket.nsp.name}-${channel}`);
      });
    });
    socket.on("disconnect", () => {
      delete onlineMap[socket.nsp.name][socket.id];
      newNamespace.emit(
        "onlineList",
        Object.values(onlineMap[socket.nsp.name])
      );
    });
  });
};
