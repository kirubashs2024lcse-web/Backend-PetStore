const express = require("express");
const router = express.Router();
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../Controller/ProductController");
const { protect, adminOnly } = require("../Utils/authMiddleware");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, adminOnly, addProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
