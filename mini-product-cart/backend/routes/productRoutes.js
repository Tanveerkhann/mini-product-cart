const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

// Get all products
router.get("/", getProducts);

// Get single product by ID
router.get("/:id", getProductById);

module.exports = router;