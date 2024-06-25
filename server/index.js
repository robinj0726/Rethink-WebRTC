import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/hello", (request, reply) => {
  reply.send({
    message: "Hello Fastify",
  });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at: ${address}`);
});
