const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

// Add an item to the cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body; // Updated from medicineId to productId
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ userId, items: [{ productId, quantity }] }); // Updated
    } else {
      // Check if the product already exists in the cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId); // Updated
      if (itemIndex > -1) {
        // Increment quantity if product exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ productId, quantity }); // Updated
      }
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Get the user's cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId'); // Updated
    res.status(200).json(cart);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Remove an item from the cart
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body; // Updated from medicineId to productId
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // Filter out the product to remove it from the cart
      cart.items = cart.items.filter(item => item.productId.toString() !== productId); // Updated
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;
