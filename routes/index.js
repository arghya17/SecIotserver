const express = require("express");
const router = express.Router();
const userRegistration = require("./register");
const userLogin = require("./login");
const checkAuth = require("./checkAuth");
const nmap = require("./nmap");
const metasploit = require("./metasploit");
const spike = require("./spike");

router.post("/register", userRegistration);
router.post("/login", userLogin.UserLogin);
router.post("/change-password", checkAuth, userLogin.changePassword); //checkAuth is used to secure the route
router.post("/user/nmap", checkAuth, nmap);
router.post("/user/metasploit", checkAuth, metasploit);
router.post("/user/spike", checkAuth, spike);
module.exports = router;
