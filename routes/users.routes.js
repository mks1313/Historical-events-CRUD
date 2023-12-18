const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");



router.get("/profile", isLoggedIn, (req, res) => {
    res.render("users/user-profile")
})


module.exports = router;