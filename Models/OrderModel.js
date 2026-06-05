const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
    userEmail: String,
    items: [
        {
            productId: String,
            name: String,
            price: Number,
            qty: Number,
            image: String,
        }
    ],
    total: Number,
    status: { type: String, enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Order Placed" },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
