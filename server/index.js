import Fastify from "fastify";
import websocket from "@fastify/websocket";

const fastify = Fastify({
  logger: true,
});
await fastify.register(websocket);

let users = {};

fastify.get("/ws", { websocket: true }, (socket, req) => {
  socket.on("message", (message) => onMessage(socket, message));

  socket.on("close", () => {
    console.log("Client disconnected.");
  });

  socket.on("error", (error) => {
    console.error(error);
  });
});

function send(wsClient, type, body) {
  const json = {
    type,
    body,
  };

  console.log("[server]Sent message", json);
  wsClient.send(JSON.stringify(json));
}

function onMessage(socket, message) {
  const parsedMessage = JSON.parse(message);
  console.log("[server]Received message: ", parsedMessage);
  const type = parsedMessage.type;
  const body = parsedMessage.body;
  switch (type) {
    case "join":
      const userId = body;
      users[userId] = socket;
      const userIds = Object.keys(users).filter((id) => id !== userId);
      send(socket, "joined", userIds);
      break;
  }
}

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});
