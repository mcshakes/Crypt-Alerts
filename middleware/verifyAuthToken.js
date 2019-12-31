const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("No token, Authorization Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY)
    req.user = verified;
    console.log("VERIFIED??", req.user)
    next();

    //returns the ID with the payload
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = authenticate;