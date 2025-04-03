const jwt = require("jsonwebtoken");
const fetchuser = (req, res, next) => {
require('dotenv').config()    
  //get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  console.log("Token:",token);
  if (!token) {
    return res.status(401).send({ error: "Token not provided" });
  }
  try {
    const string = jwt.verify(token, process.env.JWT_SECRET);
    req.user = string.user;
    console.log("String:",string)
    console.log("Token is valid");
    next();
  } catch (error) {
    console.log("Invalid token:",error);
     return  res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;