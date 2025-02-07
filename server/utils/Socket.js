const { Server } = require("socket.io");

exports.initializeSocket = (server) => {
  let activeUsers = {}; // Store currently joined users in memory

  // Initialize Socket.io
  const io = new Server(server, {
    cors: { origin: `${process.env.FRONTEND_URL}`, methods: ["GET", "POST"] },
    pingTimeout: 5000, // 5 seconds for the server to detect disconnections
    pingInterval: 1000, // 1 second interval for pings to the server to detect disconnections 
  });

  io.on("connection", (socket) => {
    // console.log("User connected:", socket.id);

    // Event handler for when a user joins an event
    socket.on("joinEvent", ({ eventId, userName }) => {
      socket.join(eventId);

      // Initialize the activeUsers object if it doesn't exist
      if (!activeUsers[eventId]) {
        activeUsers[eventId] = [];
      }

      // Add the new user to the activeUsers object
      if (!activeUsers[eventId].includes(userName)) {
        activeUsers[eventId].push(userName);
      }

      // console.log(`User ${userName} joined event room: ${eventId}`);

      // Send the updated activeUsers object to the client
      io.to(eventId).emit("updateAttendees", activeUsers[eventId]);
      // console.log(activeUsers);
    });

    // Event handler for when a user leaves an event
    socket.on("leaveEvent", ({ eventId, userName }) => {
      socket.leave(eventId);

      if (activeUsers[eventId]) {
        activeUsers[eventId] = activeUsers[eventId].filter(
          (name) => name !== userName
        );
      }

      console.log(`User ${userName} left event room: ${eventId}`);

      // Send the updated activeUsers object to the client
      io.to(eventId).emit("updateAttendees", activeUsers[eventId]);

      // console.log(`Active users for event after leaving ${userName}:`, activeUsers);
    });

    // Event handler for when a user disconnects
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      // console.log(activeUsers);
    });
  });

  return io;
};
