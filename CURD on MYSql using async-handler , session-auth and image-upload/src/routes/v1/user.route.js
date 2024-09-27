const express = require("express");
const userController = require("../../controller/user.controller");
const verify = require("../../middleware/verify");
const upload = require("../../middleware/multer");
const router = express.Router();

router.route("/logout").get(verify, userController.logout);
router.route("/").get(verify, userController.getUsers);
router.route("/:id").get(verify, userController.getUserById);
router.route("/").post(verify, upload, userController.insertUser);
router.route("/:id").put(verify, upload, userController.updateUser);
router.route("/:id").delete(verify, userController.deleteUser);
router.route("/uploadImage/:id").put(verify, upload, userController.imageUser);

module.exports = router;
