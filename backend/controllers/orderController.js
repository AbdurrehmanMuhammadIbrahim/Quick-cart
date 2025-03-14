const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Create an order
const createOrder = async (req, res) => {
    const { shippingAddress, paymentMethod } = req.body;
  
    try {
      const cart = await Cart.findOne({ user: req.user.id }).populate("items.product", "price");
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

  
      // Safely calculate totalPrice
      
      const totalPrice = cart.items.reduce((sum, item) => {
        const price = item.product?.price || 0; // Default to 0 if price is missing
        return sum + item.quantity * price ;
      }, 0);
  
      if (totalPrice <= 0) {
        return res.status(400).json({ message: "Invalid cart total price" });
      }
  
      const order = new Order({
        user: req.user.id,
        orderItems: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress,
        paymentMethod,
        totalPrice,
      });
  
      await order.save();
      await cart.deleteOne(); // Clear cart after order placement
  
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Get current user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders (Admin only)
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user", "name")
//     .populate({
//       path: "orderItems.product", // Populates the product field inside orderItems
//       select: "title price", // Selects the name and price fields from the Product model
//     })
//     .sort("-createdAt");
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const getAllOrders = async (req, res) => {
  try {

    const order = await Order.find();
    console.log("Order data before populate:", order);
    const populatedOrder = await Order.find()
    .populate('user', 'name')
    .populate({
      path: "orderItems.product",
      select: "title price",  // Select title and price from the Product model
    })

console.log("populatedOrder",populatedOrder);
  res.status(200).json(populatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("orderItems.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  const { isDelivered ,paymentStatus} = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isDelivered = isDelivered;
    order.paymentStatus = paymentStatus;
    order.deliveredAt = isDelivered ? Date.now() : null;

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, getOrderById, updateOrderStatus };
