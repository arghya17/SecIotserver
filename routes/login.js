const path = require("path");
const bodyParser = require("body-parser");
const bcrytpt = require("bcryptjs");
const db = require("../models/firebase");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} = require("firebase/firestore");

const userRef = collection(db, "users");
const getUser = async (field, data) => {
  collection(db, "users");
  const q = query(userRef, where(field, "==", data));
  const querySnapshot = await getDocs(q);
  user = null;
  querySnapshot.forEach((doc) => {
    user = doc.data();
    user.id = doc.id;
  });
  return user;
};
const jwt_secret = process.env.jwt_secret;

var UserLogin = async (req, res) => {
  var { username, password } = req.body;
  const user = await getUser("username", username);
  console.log(user);
  if (user === null) {
    res.status(400);
    return res.json({ status: "error", error: "Invalid Username/password" });
  }
  //password cannot be searched because bcrypt does not return the same hash everytime
  if (await bcrytpt.compare(password, user.password)) {
    var token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      jwt_secret
    );
    res.status(202);
    res.json({ status: "Ok", token: token }); //this token must be stored in the frontend
    //so that after login the backend can verify the data
    return res;
  }
  res.json({ status: "error", error: "Invalid Username/Password" });
  return res;
};

var changePassword = async (req, res) => {
  var { newpassword } = req.body;
  try {
    var user = req.userData;
    console.log(user);
    var id = user.id;

    if (!newpassword || typeof newpassword != "string") {
      res.status(400);
      return res.json({ status: "error", error: "Invalid password" });
    }

    if (newpassword.length < 6) {
      res.status(400);
      return res.json({
        status: "error",
        error: "Password two small should be at least 7 characters",
      });
    }
    let salt = await bcrytpt.genSalt(10);
    let hashedPassword = await bcrytpt.hash(newpassword, salt);
    updateDoc(doc(db, "users", id), {
      password: hashedPassword,
    }).catch((err) => {
      console.log(err);
      res.status(404);
      res.json({ status: "error", error: "Database error" });
    });
    res.status(202);
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({ status: "error", error: "somebody messed around the token" });
  }
};
module.exports.UserLogin = UserLogin;
module.exports.changePassword = changePassword;
