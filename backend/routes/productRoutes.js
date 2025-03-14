const express = require("express");
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.get("/", getProducts); // Public
router.get("/:id", getProductById); // Public
router.post("/", protect, createProduct); // Admin only
router.put("/:id", protect, adminOnly, updateProduct); // Admin only
router.delete("/:id", protect, adminOnly, deleteProduct); // Admin only

module.exports = router;
