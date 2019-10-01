const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY)
    req.user = verified;
    next();
    //returns the ID with the payload
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}