const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder); // Place an order
router.get("/", protect, getUserOrders); // Get current user's orders
router.get("/admin", protect, adminOnly, getAllOrders); // Get all orders (Admin only)
router.get("/:id", protect, getOrderById); // Get order by ID
router.put("/:id", protect, adminOnly, updateOrderStatus); // Update order status (Admin only)

module.exports = router;
