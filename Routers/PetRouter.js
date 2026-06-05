const express = require("express");
const router = express.Router();
const { submitPet, getSubmissions, getApprovedPets, approvePet, rejectPet, deletePet } = require("../Controller/PetController");
const { protect, adminOnly } = require("../Utils/authMiddleware");

router.get("/approved", getApprovedPets);
router.post("/submit", protect, submitPet);
router.get("/submissions", protect, adminOnly, getSubmissions);
router.put("/approve/:id", protect, adminOnly, approvePet);
router.put("/reject/:id", protect, adminOnly, rejectPet);
router.delete("/:id", protect, adminOnly, deletePet);

module.exports = router;
