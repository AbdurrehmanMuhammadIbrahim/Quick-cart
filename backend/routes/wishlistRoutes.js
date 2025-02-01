const express = require("express");
const { addToWishlist, getWishlist, removeFromWishlist,removeSingleFromWishlist } = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add product to wishlist
router.post("/", protect, addToWishlist);

// Get user's wishlist
router.get("/", protect, getWishlist);

// Remove product from wishlist
router.delete("/", protect, removeFromWishlist);

// Remove single product from wishlist
router.delete("/:productId", protect, removeSingleFromWishlist);
module.exports = router;
