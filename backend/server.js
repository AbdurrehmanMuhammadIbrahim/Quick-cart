// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const cors = require('cors');
// const path = require('path');

// dotenv.config();
// connectDB();
// const app = express();
// app.use(express.json());
// // app.use("/", (req, res) => res.send("Backend API running"));
// app.use(cors());

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/wishlist", require("./routes/wishlistRoutes"));

// // app.use("/api/chat", require("./routes/chatRoutes"));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Error Handling Middleware
// // app.use(require("./middleware/errorHandler"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:3000',
  'https://quick-cart-alpha.vercel.app' // Add Vercel domain here
];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    //  // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/chat", require("./routes/chatRoutes")); // Chat Routes

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Socket.IO Real-time Communication
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data); // Broadcast message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
