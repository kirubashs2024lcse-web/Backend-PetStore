const express = require("express");
const router = express.Router();
const { submitPet, getSubmissions, getApprovedPets, approvePet, rejectPet } = require("../Controller/PetController");
const { protect, adminOnly } = require("../Utils/authMiddleware");
const upload = require("../Utils/upload");

router.get("/approved", getApprovedPets);
router.post("/submit", protect, submitPet);
router.get("/submissions", protect, adminOnly, getSubmissions);
router.put("/approve/:id", protect, adminOnly, approvePet);
router.put("/reject/:id", protect, adminOnly, rejectPet);

module.exports = router;
