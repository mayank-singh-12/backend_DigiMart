const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();

require("dotenv").config();

// MODELS
const Category = require("./models/category.models");
const Product = require("./models/product.models");
const Order = require("./models/order.models");
const User = require("./models/user.models");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  try {
    res.send("Hi, DigiMart.");
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET ALL PRODUCTS
async function getAllProducts() {
  try {
    const productsData = await Product.find().populate("category");
    return productsData;
  } catch (error) {
    console, log("Error occured in DB while querying products: ", error);
  }
}

app.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    if (!products) {
      return res.status(404).json({ error: "No products found!" });
    }
    res.status(200).json({ products });
  } catch {
    res.status(500).json({ error });
  }
});

// GET PRODUCT BY ID
async function getProductById(productId) {
  try {
    const productData = await Product.findById(productId).populate("category");
    return productData;
  } catch (error) {
    console.log("Error in DB while fetching product by Id: ", error);
  }
}

app.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await getProductById(productId);
    if (!product) return res.status(404).json({ error: "Product not found!" });
    res.status(200).json({ product });
  } catch {
    res.status(500).json({ error: "Unable to fetch prdouct by Id." });
  }
});

// GET ALL CATEGORIES
async function getAllCategories() {
  try {
    const categoriesData = await Category.find().populate("products");
    return categoriesData;
  } catch (error) {
    throw ("Error in DB while fetching categories:", error);
  }
}

app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    if (categories.length === 0)
      return res.status(404).json({ error: "No Categories Found!" });
    res.status(200).json({ categories });
  } catch {
    res.status(500).json({ error: "Unable to fetch categories!" });
  }
});

// GET CATEGORY BY ID
async function getCategoryById(categoryId) {
  try {
    const categoryData = await Category.findById(categoryId).populate(
      "products"
    );
    return categoryData;
  } catch (error) {
    throw ("Error in DB while fetching category by Id:", error);
  }
}

app.get("/categories/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);
    if (!category)
      return res.status(404).json({ error: "Cartegory not found!" });
    res.status(200).json({ category });
  } catch {
    res.status(500).json({ error: "Unable to find category By Id!" });
  }
});

// SAVE NEW ORDER
async function addNewOrder(orderDetails) {
  try {
    const newOrder = new Order(orderDetails);
    const saveOrder = await newOrder.save();
    return saveOrder;
  } catch (error) {
    console.log("Error in DB while adding new order: ", error);
  }
}

app.post("/orders", async (req, res) => {
  try {
    const orderObj = req.body;
    const savedOrder = await addNewOrder(orderObj);
    if (!savedOrder) {
      return res.status(400).json({ error: "Order validation failed." });
    }
    res
      .status(200)
      .json({ message: "Successfully added new order!", order: savedOrder });
  } catch {
    res.status(500).json({ error: "Unable to add new order." });
  }
});

// GET ALL ORDERS
async function getAllOrders() {
  try {
    const allOrders = await Order.find();
    return allOrders;
  } catch (error) {
    console.log("Error in DB while fetching all orders: ", error);
  }
}

app.get("/orders", async (req, res) => {
  try {
    const allOrders = await getAllOrders();
    if (allOrders.length == 0)
      return res.status(404).json({ error: "Orders not found." });
    return res.status(200).json({ orders: allOrders });
  } catch {
    res.status(500).json({ error: "Unable to fetch all orders." });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on PORT:", port);
});
