const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// GET route to fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);  // Return products directly as an array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to add a new product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).json(product);  // Return the newly created product
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// router.get('/search', async (req, res) => {
//   const { query } = req.query; // Retrieve the search query from request
//   try {
//     const products = await Product.find({
//       $or: [
//         { name: { $regex: query, $options: 'i' } }, // Case-insensitive name match
//         { description: { $regex: query, $options: 'i' } }, // Case-insensitive description match
//       ],
//     });
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to search products' });
//   }
// });

module.exports = router;
