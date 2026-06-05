const Product = require("../Models/ProductModel");

const addProduct = async (req, res) => {
    try {
        const { name, price, category, description, image } = req.body;
        const product = await Product.create({ name, price: parseFloat(price), category, description, image });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

module.exports = { addProduct, getProducts, getProductById };
