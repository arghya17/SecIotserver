const path = require("path");
const bodyParser = require("body-parser");
const bcrytpt = require("bcryptjs");
const db = require("../models/firebase");
const validator = require("email-validator");
const {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} = require("firebase/firestore");

const userRef = collection(db, "users");

const userRegistration = async (req, res) => {
  //console.log(await req.body);
  var { email, username, password } = req.body;

  if (!email || !validator.validate(email)) {
    res.status(400);
    return res.json({ status: "error", error: "Invalid email id" });
  }

  if (!username || typeof username != "string") {
    res.status(400);
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!password || typeof password != "string") {
    res.status(400);
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (password.length < 6) {
    res.status(400);
    return res.json({
      status: "error",
      error: "Password two small should be at least 7 characters",
    });
  }
  // Create a query against the collection.
  const checkduplicate = async (field, data) => {
    const q = query(userRef, where(field, "==", data));
    const querySnapshot = await getDocs(q);
    let flag = false;
    querySnapshot.forEach((doc) => {
      flag = true;
      return;
    });

    return flag;
  };
  if (
    (await checkduplicate("email", email)) ||
    (await checkduplicate("username", username))
  ) {
    return res.status(400).json({
      status: "error",
      error: "username or email is in use",
    });
  }
  var salt = await bcrytpt.genSalt(10);
  //bcrypt is used to protect the password using encryption
  password = await bcrytpt.hash(password, salt);
  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "users"), {
      email: email,
      username: username,
      password: password,
    });
  } catch (error) {
    //unique email not checked
    // console.log(error.message);
    // if (error.code === 11000) {
    //   res.status(400);
    //   return res.json({ status: "error", error: "username already in use" });
    // }
    // throw error;
  }
  res.status(201);
  res.json({ status: "ok" });
};

module.exports = userRegistration;
