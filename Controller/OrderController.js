const Order = require("../Models/OrderModel");
const User = require("../Models/UserModel");

const placeOrder = async (req, res) => {
    try {
        const { items, total } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        const user = await User.findById(req.user.id).select("firstname lastname email");
        if (!user) return res.status(404).json({ message: "User not found" });

        const order = await Order.create({
            user: user._id,
            userName: `${user.firstname} ${user.lastname}`,
            userEmail: user.email,
            items,
            total: Number(total),
        });

        res.status(201).json(order);
    } catch (error) {
        console.error("placeOrder error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("getUserOrders error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("getAllOrders error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        console.error("updateOrderStatus error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
