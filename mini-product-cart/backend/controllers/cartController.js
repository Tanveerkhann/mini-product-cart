const Cart = require("../models/Cart");

// Add Product to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const existingItem = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;

      if (existingItem.quantity < 1) {
        existingItem.quantity = 1;
      }

      await existingItem.save();

      return res.status(200).json({
        message: "Cart Updated Successfully",
      });
    }

    await Cart.create({
      user: userId,
      product: productId,
      quantity,
    });

    res.status(201).json({
      message: "Product Added To Cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.find({ user: userId }).populate("product");

    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    res.status(200).json({
      totalPrice,
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Quantity
const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      _id: req.params.itemId,
      user: userId,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart Item Not Found",
      });
    }

    cartItem.quantity = quantity;

    if (cartItem.quantity < 1) {
      cartItem.quantity = 1;
    }

    await cartItem.save();

    res.status(200).json({
      message: "Quantity Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Cart Item
const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;

    const cartItem = await Cart.findOne({
      _id: itemId,
      user: userId,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await Cart.findByIdAndDelete(itemId);

    res.status(200).json({
      message: "Item Removed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  deleteCartItem,
};