const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../Controller/OrderController");
const { protect, adminOnly } = require("../Utils/authMiddleware");

// specific routes MUST come before param routes
router.get("/my", protect, getUserOrders);
router.get("/all", protect, adminOnly, getAllOrders);
router.post("/", protect, placeOrder);
router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;
