export const setupSocketServer = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Device connected: ${socket.id}`);

    socket.on("SEND_MESSAGE", (payload) => {
      const { nextHopSocketId, message } = payload;

      if (nextHopSocketId) {
        io.to(nextHopSocketId).emit("FORWARD_MESSAGE", message);
      }
    });

    socket.on("disconnect", () => {
      console.log(` Device disconnected: ${socket.id}`);
    });
  });
};
