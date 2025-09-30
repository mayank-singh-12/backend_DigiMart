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

const fs = require("fs");
const path = require("path");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const usersFilePath = path.join(__dirname, "data/users.json");
const categoriesFilePath = path.join(__dirname, "data/category.json");
const productsFilePath = path.join(__dirname, "data/products.json");

const usersJson = fs.readFileSync(usersFilePath, "utf-8");
const categoriesJson = fs.readFileSync(categoriesFilePath, "utf-8");
const productsJson = fs.readFileSync(productsFilePath, "utf-8");

const usersData = JSON.parse(usersJson);
const categoriesData = JSON.parse(categoriesJson);
const productsData = JSON.parse(productsJson);

async function seedData() {
  //   ADDING USERS
  //   for (const user of usersData) {
  //     try {
  //       const newUser = new User({
  //         name: user.name,
  //         email: user.email,
  //       });
  //       newUser.save();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   ADDING CATEGORIES
  //   for (const category of categoriesData) {
  //     try {
  //       const newCategory = new Category({
  //         name: category.name,
  //         products: category.products,
  //       });
  //       newCategory.save();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  // for (const product of productsData) {
  //   try {
  //     const newProduct = new Product({
  //       title: product.title,
  //       category: product.category,
  //       description: product.description,
  //       price: product.price,
  //       discount: product.discount,
  //       models: product.models,
  //       rating: product.rating,
  //       images: product.images,
  //     });
  //     console.log(product.category);
  //     console.log(newProduct);

  //     await newProduct.save();
  //     console.log("Product Saved!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const products = await Product.find();
  for (const product of products) {
    addProductToCategory(product._id);
  }
}

seedData();

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

// ADD PRODUCT TO CATEGORY
async function addProductToCategory(productId) {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw "Product not found.";
    }
    const productCategories = product.category;
    for (const categoryId of productCategories) {
      const categoryDoc = await Category.findById(categoryId);
      if (!categoryDoc) {
        console.log("Categroy not found.");
        continue;
      }
      const categoryProducts = categoryDoc.products;
      if (categoryProducts.includes(product._id)) {
        console.log("Product already present in category.");
        continue;
      }
      categoryDoc.products.push(product._id);
      // console.log(categoryDoc);
      await Category.findByIdAndUpdate(categoryId, categoryDoc);
      console.log(`${categoryDoc.name} updated!`);
    }
  } catch (error) {
    console.log(error);
  }
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on PORT:", port);
});
