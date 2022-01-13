const express = require("express");
const userController = require("../controllers/user_controller");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/signup", userController.user_create);

router.post("/login", userController.user_login);

router.get("/myProfile", auth, userController.user_profile);

router.post("/logout", auth, userController.logout_accout);

router.post("/logoutAll", auth, userController.logout_allaccounts);

router.delete("/del_myProfile", auth, userController.delete_myProfile);

router.put("/update_myProfile", auth, userController.update_myProfile);

module.exports = router;