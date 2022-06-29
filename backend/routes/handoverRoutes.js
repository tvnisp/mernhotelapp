const express = require("express");
const router = express.Router();

const {
  createHandover,
  deleteHandover,
  getHandovers,
} = require("../controllers/handoverController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getHandovers).post(protect, createHandover);
router.route("/:id").delete(protect, deleteHandover);

module.exports = router;
