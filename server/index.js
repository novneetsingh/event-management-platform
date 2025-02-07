const express = require("express");
const http = require("http"); // Import HTTP module
const app = express();
require("dotenv").config();
const cors = require("cors");
const { initializeSocket } = require("./utils/Socket");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

// Define port number
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Connect to database and cloudinary
require("./config/database").dbconnect();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io with HTTP server
initializeSocket(server);

// Route setup
app.use("/user", userRoutes);
app.use("/event", eventRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Hello Hi Bye</h1>");
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
