const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany([
      {
        name: "iPhone 15",
        description: "Apple Smartphone",
        price: 79999,
        category: "Mobile",
        stock: 10,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Samsung S24",
        description: "Samsung Smartphone",
        price: 69999,
        category: "Mobile",
        stock: 12,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "MacBook Air M3",
        description: "Apple Laptop",
        price: 114999,
        category: "Laptop",
        stock: 5,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Dell Inspiron",
        description: "Windows Laptop",
        price: 58999,
        category: "Laptop",
        stock: 8,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "HP Pavilion",
        description: "HP Laptop",
        price: 61999,
        category: "Laptop",
        stock: 6,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Boat Rockerz 450",
        description: "Wireless Headphones",
        price: 1499,
        category: "Headphones",
        stock: 20,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Sony WH-1000XM5",
        description: "Noise Cancelling Headphones",
        price: 29999,
        category: "Headphones",
        stock: 7,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Logitech G102",
        description: "Gaming Mouse",
        price: 1499,
        category: "Accessories",
        stock: 30,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Dell Keyboard",
        description: "USB Keyboard",
        price: 899,
        category: "Accessories",
        stock: 25,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Apple Watch",
        description: "Smart Watch",
        price: 39999,
        category: "Wearable",
        stock: 10,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Samsung Galaxy Watch",
        description: "Android Smart Watch",
        price: 24999,
        category: "Wearable",
        stock: 9,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "iPad Air",
        description: "Apple Tablet",
        price: 59999,
        category: "Tablet",
        stock: 6,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Lenovo Tab",
        description: "Android Tablet",
        price: 21999,
        category: "Tablet",
        stock: 11,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "JBL Speaker",
        description: "Bluetooth Speaker",
        price: 3499,
        category: "Speaker",
        stock: 15,
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Canon EOS 1500D",
        description: "DSLR Camera",
        price: 42999,
        category: "Camera",
        stock: 4,
        imageUrl: "https://via.placeholder.com/150"
      }
    ]);

    console.log("✅ Products Seeded Successfully");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });