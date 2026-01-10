const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/UserController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");


router.post("/register", userControllers.registerUser);
router.post("/verify-email", userControllers.verifyEmail);

router.post("/create", userControllers.createrUser);
router.post("/login", userControllers.loginUser);
router.put("/update-user/:id", userControllers.updateUser);
router.delete("/delete-user/:id", authMiddleware, userControllers.deleteUser);
router.get("/getAllUser", authMiddleware, userControllers.getAllUser);
router.get("/get-details/:id", authUserMiddleware, userControllers.getDetailsUser);
router.patch("/block/:id", authMiddleware, userControllers.blockUser);
router.patch("/unblock/:id", authMiddleware, userControllers.unblockUser);
router.post("/refresh-token", authUserMiddleware, userControllers.refreshToken);
router.post("/change-password", authUserMiddleware, userControllers.changePassword);




module.exports = router;