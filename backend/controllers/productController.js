const Product = require("../models/Product");
const upload = require('../utils/upload'); // Import the Multer config


// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// // Create a product and upload image
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     // Make sure a file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: 'No image file uploaded' });
//     }

//     const { name, price, description } = req.body;

//     // Store the file path (local storage path)
//     const imageUrl = req.file.path;

//     // Create a new product with image URL
//     const product = new Product({
//       name,
//       price,
//       description,
//       image: imageUrl,
//     });

//     // Save the product in the database
//     await product.save();

//     res.status(201).json({ message: 'Product created successfully', product });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });



// Create a new product (Admin only)
const createProduct = async (req, res) => {
  // try {
  //   const product = new Product(req.body);
  //   await product.save();
  //   res.status(201).json(product);
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }


   // Use Multer to handle image upload
   upload.array('images', 5)(req, res, async (err) => {
    if (err) {
      // Handle any errors that occurred during the file upload
      return res.status(400).json({ error: err.message });
    }

    try {
      // Ensure that at least one image is uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image is required' });
      }

      // Extract the uploaded image file paths
      const imageUrls = req.files.map(file => file.path); // Array of image file paths

      // Create a new product with the uploaded images
      const product = new Product({
        ...req.body, // Get product details from the request body
        images: imageUrls, // Store the array of image paths
      });

      // Save the product to the database
      await product.save();

      // Send the response with the created product
      res.status(201).json({
        message: 'Product created successfully',
        product: product,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
};

// Update an existing product (Admin only)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a product (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
