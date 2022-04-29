var jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //send jwt token using authorization in header with bearer keyword
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.userData = decoded;
    //userdata is availale in req.userData field
    next();
  } catch (error) {
    res.status(400);
    res.json({ status: "error", error: "Authentication failed" });
    return res;
  }
};
