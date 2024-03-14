const express = require("express");
const router = new express.Router();
const noteController = require("../Controllers/noteControllers");
const userController = require("../Controllers/userControllers");
const authController = require("../Controllers/authControllers");

router.get("/note/get", noteController.getNote);
router.post("/note/add", noteController.createNote);
router.patch("/note/update/:id", noteController.updateNote);
router.delete("/note/delete/:id", noteController.deleteNote);

router.get("/user/get", userController.getUser);
// router.post("/user/add", userControllers.createUser);
router.patch("/user/update/:id", userController.updateUser);
router.delete("/user/delete/:id", userController.deleteUser);

router.post("/user/register", authController.register);
router.post("/user/login", authController.login);
router.get(
  "/user/protected",
  authController.authCheck,
  authController.protected
);
router.post("/note/uploadTest", noteController.upload, noteController.homePage);

module.exports = router;
