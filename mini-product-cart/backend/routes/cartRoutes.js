const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateQuantity,
  deleteCartItem,
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

// Add Product
router.post("/", authMiddleware, addToCart);

// Get Cart
router.get("/", authMiddleware, getCart);

// Update Quantity (+ / -)
router.put("/:itemId", authMiddleware, updateQuantity);

// Remove Item
router.delete("/:itemId", authMiddleware, deleteCartItem);

module.exports = router;