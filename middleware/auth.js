const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next(); // next() is used to continue to the next middleware
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    req.isAuth = false;
    return next(); // next() is used to continue to the next middleware
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next(); // next() is used to continue to the next middleware
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
