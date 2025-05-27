const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/UserController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/register", userControllers.createrUser);
router.post("/login", userControllers.loginUser);
router.put("/update-user/:id", userControllers.updateUser);
router.delete("/delete-user/:id", authMiddleware, userControllers.deleteUser);
router.get("/getAllUser", authMiddleware, userControllers.getAllUser);
router.get("/get-details/:id", userControllers.getDetailsUser);
router.post("/refresh-token", userControllers.refreshToken);

module.exports = router;