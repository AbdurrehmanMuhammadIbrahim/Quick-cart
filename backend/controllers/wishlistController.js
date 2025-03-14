const Wishlist = require("../models/Wishlist");
const mongoose = require("mongoose");

// Add product to wishlist
const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // Assuming user ID comes from authenticated request

  try {
    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find or create the wishlist
    let wishlist = await Wishlist.findOne({ user: userId });
    console.log("Existing Wishlist:", wishlist);

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Check if product is already in the wishlist
    if (wishlist.products.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Add product to wishlist
    wishlist.products.push(productId);
    console.log("Wishlist before saving:", wishlist);

    // Save updated wishlist
    const savedWishlist = await wishlist.save();
    console.log("Saved Wishlist:", savedWishlist);

    res.status(201).json(savedWishlist);
  } catch (err) {
    console.error("Error adding to wishlist:", err.message);
    res.status(500).json({ error: err.message });
  }
};


const getWishlist = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
  
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      res.json(wishlist);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const removeFromWishlist = async (req, res) => {
    // const { productId } = req.params;
    const userId = req.user.id;
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
    //   wishlist.products = wishlist.products.filter(
    //     (id) => id.toString() !== productId
    //   );
  
      await wishlist.save();
  
      res.json({ message: "Product removed from wishlist" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const removeSingleFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;
  
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
  
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
  
      await wishlist.save();
  
      res.json({ message: "Product removed from wishlist" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  


  module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    removeSingleFromWishlist,
  };
  