const express = require("express");
const userController = require("../../controller/user.controller");
const router = express.Router();

router.route("/").get(userController.getUsers);
router.route("/:id").get(userController.getUserById);
router.route("/").post(userController.insertUser);
router.route("/:id").put(userController.updateUser);
router.route("/:id").delete(userController.deleteUser);

router.route("/register").post(userController.register);
router.route("/login/:email/:password").get(userController.login);

module.exports = router;
