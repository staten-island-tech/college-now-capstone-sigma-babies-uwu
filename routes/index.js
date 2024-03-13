const express = require("express");
const router = new express.Router();
const noteControllers = require("../Controllers/noteControllers");
const userControllers = require("../Controllers/userControllers");
const authController = require("../Controllers/authControllers");

router.get("/note/get", noteControllers.getNote);
router.post("/note/add", noteControllers.createNote);
router.patch("/note/update/:id", noteControllers.updateNote);
router.delete("/note/delete/:id", noteControllers.deleteNote);

router.get("/user/get", userControllers.getUser);
// router.post("/user/add", userControllers.createUser);
router.patch("/user/update/:id", userControllers.updateUser);
router.delete("/user/delete/:id", userControllers.deleteUser);

router.post("/user/register", authController.register);

module.exports = router;
