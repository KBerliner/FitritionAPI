const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

// Routing Endpoints

// User

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/test", userCtrl.test);

// Workout

// Exporting Routes

module.exports = router;
