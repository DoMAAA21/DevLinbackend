const upload = require("../utils/multer");

const express = require("express");

const router = express.Router();

const getProducts = require("../models/user");

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

// const upload = require("../utils/multer");



const {
  registerUser,

  loginUser,

  logout,
  googlelogin,

//   forgotPassword,
//   resetPassword,

  getUserProfile,

  allUsers,

  updateProfile,

//   updatePassword,

   getUserDetails,

  updateUser,

  deleteUser,
newUser
} = require("../controllers/userController");

const {
  isAuthenticatedUser,

  authorizeRoles,
} = require("../middlewares/auth");

// router
//   .route("/admin/user/:id")

//   .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)

//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)

//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);


router.route('/admin/user/:id').get( getUserDetails).put(updateUser)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
// router.route("/admin/newuser").post(newUser);

// router.post("/admin/newuser",  upload.array('avatar', 10), newUser);
router.post("/admin/user/new",isAuthenticatedUser, authorizeRoles("admin"), upload.single("avatar"), newUser);
router.put(
  "/me/update",
  isAuthenticatedUser,
  upload.single("avatar"),
  updateProfile
);

// router.put("/password/update", isAuthenticatedUser, updatePassword);

router.get("/me", isAuthenticatedUser, getUserProfile);

router.post("/register", upload.single("avatar"), registerUser);

router.post("/login", loginUser);

router.post("/googlelogin", googlelogin);

// router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);




module.exports = router;
