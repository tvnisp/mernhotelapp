const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000 * 2000 * 5 },
});

const {
  createIncident,
  getIncident,
  deleteIncident,
  updateIncident,
  getIncidents,
} = require("../controllers/incidentController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getIncidents)
  .post(protect, upload.single("file"), createIncident);
router
  .route("/:id")
  .get(protect, getIncident)
  .delete(protect, deleteIncident)
  .put(protect, updateIncident);

module.exports = router;
