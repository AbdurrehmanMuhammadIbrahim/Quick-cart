const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add item to cart
const addItemToCart = async (req, res) => {
  const products = req.body; // Expecting an array of products { productId, quantity }
  const userId = req.user.id;

  try {
    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Input must be an array of products" });
    }

    // Validate product IDs and quantities
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
    }

    // Find or create the cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Add or update products in the cart
    for (const item of products) {
      const existingItem = cart.items.find((cartItem) =>
        cartItem.product.toString() === item.productId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity; // Update quantity if product already exists
      } else {
        cart.items.push({ product: item.productId, quantity: item.quantity }); // Add new product
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === req.params.id);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
const deleteCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.id);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addItemToCart, getUserCart, updateCartItem, deleteCartItem, clearCart };
