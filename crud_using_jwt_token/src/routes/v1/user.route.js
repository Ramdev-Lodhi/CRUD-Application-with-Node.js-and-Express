const express = require("express");
const userController = require("../../controller/user.controller");
const { validationJoi } = require('../../middleware/validation');
const { userSchema, loginSchema } = require('../../validations/userSchemas'); 
// const authenticate = require('../../middleware/auth');
const router = express.Router();

// router.use(authenticate); // This ensures that all routes in this file require authentication

router.route("/").get(userController.getUsers);
router.route("/:id").get(userController.getUserById);
router.route("/").post(validationJoi(userSchema), userController.insertUser);
router.route("/:id").put(validationJoi(userSchema),userController.updateUser);
router.route("/:id").delete(userController.deleteUser);

router.route("/register").post(validationJoi(userSchema),userController.register);
router.route("/login/:email/:password").get(userController.login);

module.exports = router;
