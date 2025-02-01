const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true ,default:null},
  stock: { type: Number, default: 0 },
  ratings: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      rating: Number,
      comment: String,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);


