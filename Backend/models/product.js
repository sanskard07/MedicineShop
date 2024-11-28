const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }, // Quantity in stock
  category: { type: String, required: true }, // Category of the product
  image: { type: String }, // URL for product image
});

// Export the Product model
module.exports = mongoose.model('Product', productSchema);
