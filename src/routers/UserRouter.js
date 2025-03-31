const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/UserController");

router.post("/register", userControllers.createrUser);
router.post("/login", userControllers.loginUser);
router.put("/update-user/:id", userControllers.updateUser);

module.exports = router;