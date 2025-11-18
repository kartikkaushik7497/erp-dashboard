const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const auth = require("../middleware/authMiddleware");

router.get("/summary", auth, reportController.getSummary);
router.get("/chart", auth, reportController.getChart);
router.get("/table", auth, reportController.getTable);

module.exports = router;
