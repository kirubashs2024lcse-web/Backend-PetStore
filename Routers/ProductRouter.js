const express = require("express");
const router = express.Router();
const { addProduct, getProducts, getProductById } = require("../Controller/ProductController");
const { protect, adminOnly } = require("../Utils/authMiddleware");
const upload = require("../Utils/upload");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, adminOnly, addProduct);

module.exports = router;
