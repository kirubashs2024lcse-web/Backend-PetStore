const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    petName: String,
    species: String,
    breed: String,
    age: Number,
    description: String,
    image: String,
    ownerName: String,
    email: String,
    phone: String,
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Pet", PetSchema);
