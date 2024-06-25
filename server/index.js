import Fastify from "fastify";
import websocket from "@fastify/websocket";

const fastify = Fastify({
  logger: true,
});
await fastify.register(websocket);

fastify.get("/hello", (request, reply) => {
  reply.send({
    message: "Hello Fastify",
  });
});

fastify.get("/hello-ws", { websocket: true }, (connection, req) => {
  connection.socket.on("message", (message) => {
    connection.socket.send("Hello Fastify WebSockets");
  });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});
