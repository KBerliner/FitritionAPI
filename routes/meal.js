const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const mealCtrl = require("../controllers/meal");

// Routing Endpoints

router.post("/add", auth, mealCtrl.add);
router.put("/change/:id", auth, mealCtrl.change);
router.delete("/delete/:id", auth, mealCtrl.delete);
router.get("/all", auth, mealCtrl.all);

// Exporting Routes

module.exports = router;
