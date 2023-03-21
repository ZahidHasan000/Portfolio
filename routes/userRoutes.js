const express = require("express");

const login = require("../controller/userController");
const logout = require("../controller/userController");
const getUser = require("../controller/userController");
const myProfile = require("../controller/userController");
const isAuthenticated = require("../middlewares/auth");
const contact = require("../controller/userController");
const updateUser = require("../controller/userController");
const addTimeline = require("../controller/userController");
const addYoutube = require("../controller/userController");
const addProject = require("../controller/userController");

const deleteTimeline = require("../controller/userController");
const deleteYoutube = require("../controller/userController");
const deleteProject = require("../controller/userController");


const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/user").get(getUser);
userRouter.route("/me").get(isAuthenticated, myProfile);
userRouter.route("/admin/update").put(isAuthenticated, updateUser);
userRouter.route("/admin/timeline/add").post(isAuthenticated, addTimeline);
userRouter.route("/admin/youtube/add").post(isAuthenticated, addYoutube);
userRouter.route("/admin/project/add").post(isAuthenticated, addProject);

userRouter.route("/admin/timeline/:id").delete(isAuthenticated, deleteTimeline);
userRouter.route("/admin/youtube/:id").delete(isAuthenticated, deleteYoutube);
userRouter.route("/admin/project/:id").delete(isAuthenticated, deleteProject);

userRouter.route("/contact").post(contact);

module.exports = userRouter;