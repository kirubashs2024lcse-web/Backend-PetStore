const Pet = require("../Models/PetModel");

const submitPet = async (req, res) => {
    try {
        const { petName, species, breed, age, description, ownerName, email, phone } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : "";
        const pet = await Pet.create({ petName, species, breed, age, description, ownerName, email, phone, image });
        res.status(201).json({ message: "Pet submitted for review", data: pet });
    } catch (error) {
        res.status(500).json({ message: "Error submitting pet", error: error.message });
    }
};

const getSubmissions = async (req, res) => {
    try {
        const pets = await Pet.find().sort({ createdAt: -1 });
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching submissions", error: error.message });
    }
};

const getApprovedPets = async (req, res) => {
    try {
        const pets = await Pet.find({ status: "approved" }).sort({ createdAt: -1 });
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pets", error: error.message });
    }
};

const approvePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
        if (!pet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json({ message: "Pet approved", data: pet });
    } catch (error) {
        res.status(500).json({ message: "Error approving pet", error: error.message });
    }
};

const rejectPet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
        if (!pet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json({ message: "Pet rejected", data: pet });
    } catch (error) {
        res.status(500).json({ message: "Error rejecting pet", error: error.message });
    }
};

module.exports = { submitPet, getSubmissions, getApprovedPets, approvePet, rejectPet };
