const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addItemToCart,
  getUserCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", protect, addItemToCart); // Add item to cart
router.get("/", protect, getUserCart); // Get user's cart
router.patch("/:id", protect, updateCartItem); // Update item quantity
router.delete("/:id", protect, deleteCartItem); // Remove item from cart
router.delete("/", protect, clearCart); // Clear cart

module.exports = router;
