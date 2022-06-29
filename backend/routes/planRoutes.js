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

const fileFilter = (req, file, cb) => {
  //reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/bmp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000 * 2000 * 5 },
  fileFilter: fileFilter,
});

const {
  createPlan,
  deletePlan,
  getPlans,
} = require("../controllers/planController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getPlans)
  .post(protect, upload.single("file"), createPlan);
router.route("/:id").delete(protect, deletePlan);

module.exports = router;
