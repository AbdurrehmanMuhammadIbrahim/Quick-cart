const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
// app.use("/", (req, res) => res.send("Backend API running"));
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

// app.use("/api/chat", require("./routes/chatRoutes"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error Handling Middleware
// app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
