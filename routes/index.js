const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/noteControllers");

router.get("/note/get", controllers.getNote);
router.post("/note/add", controllers.createNote);
router.patch("/note/update/:id", controllers.updateNote);
router.delete("/note/delete/:id", controllers.deleteNote);

router.get("/user/get", controllers.getUser);
router.post("/user/add", controllers.createUser);
router.patch("/user/update/:id", controllers.updateUser);
router.delete("/user/delete/:id", controllers.deleteUser);

module.exports = router;
