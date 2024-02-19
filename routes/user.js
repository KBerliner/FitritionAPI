const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

// Routing Endpoints

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.put("/addWorkout", auth, userCtrl.addWorkout);

router.get("/test", userCtrl.test);

// Exporting Routes

module.exports = router;
