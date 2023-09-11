const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/validate");
const firebaseAuth = require("../../middlewares/firebaseAuth");
const authValidation = require("../../validations/auth.validation");

const { authController } = require("../../controllers");

router.post("/login", firebaseAuth, authController.loginUser);
router.post("/register", validate(authValidation.register),firebaseAuth, authController.registerUser);
router.post("/updateProfile", validate(authValidation.updateProfile),firebaseAuth, authController.updateProfile);
router.get("/categoryListing",firebaseAuth, authController.categoryListing);

module.exports = router;