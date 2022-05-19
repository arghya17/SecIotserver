const express = require("express");
const router = express.Router();
const userRegistration = require("./register");
const userLogin = require("./login");
const checkAuth = require("./checkAuth");
const nmap = require("./nmap");
const metasploit = require("./metasploit");
const spike = require("./spike");
const static = require("./static");
const multer = require("multer");
const fs = require("fs");
const process = require("process");
const path = require("path");
const upload = multer({ dest: "uploads/" });

router.post("/register", userRegistration);
router.post("/login", userLogin.UserLogin);
router.post("/change-password", checkAuth, userLogin.changePassword); //checkAuth is used to secure the route
router.post("/user/nmap", checkAuth, nmap);
router.post("/user/metasploit", checkAuth, metasploit);
router.post("/user/spike", checkAuth, spike);
router.post("/user/static", checkAuth, upload.single("apk"), static, () => {
  fs.rmSync(path.join(process.cwd(), "/uploads"), {
    recursive: true,
    force: true,
  });
});
//the form name should be apk which is used to upload the apk files
module.exports = router;
