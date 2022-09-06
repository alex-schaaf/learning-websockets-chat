const ws = require("ws");

const wss = new ws.WebSocketServer({ port: 8000 });

const clients = new Set();

const messages = [];

wss.on("connection", (socket) => {
  clients.add(socket);
  console.log(`Client connected. n=${clients.size}`);

  socket.on("message", (data) => {
    const message = data.toString();
    console.log("Message received", message);

    for (let client of clients) {
      client.send(message);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    clients.delete(socket);
  });
});
